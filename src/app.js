import express from "express";
import "dotenv/config";
import route from "./routes/routes.js";
import mongoose from "mongoose";

import path from "path";
import { fileURLToPath } from "url";

import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import helmet from "helmet";
import tinyCsrf from "tiny-csrf";
import cookieParser from "cookie-parser";
import errorCsrf from "./middlewares/errorCsrf.js";
import csrf from "./middlewares/csrf.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

try {
  await mongoose.connect(process.env.DB_KEY);
} catch (error) {
  console.log(error);
}

app.use(helmet()); 

app.use(express.urlencoded({ extended: true })); //Trata o metodo POST

app.use(express.json()); //Parser das informaçoes vindas de uma req post

app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
  secret: 'Coisa secreta',
  store: MongoStore.create({
    mongoUrl: process.env.DB_KEY,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  }
}));

app.use(tinyCsrf(process.env.CSRF_SECRET, ['POST', 'PUT', 'DELETE']));

app.use(flash());

// CONFIGURA O LINK DA API COM O EJS
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs"); // CONFIGURA A ENGINE

// ROTAS
app.use(csrf); //middlewares csrf -> passa o token para todos os controllers

app.use(route); //Define as rotas

app.use(errorCsrf); //Verifica o erro

try {
  app.listen(Number(process.env.PORT), () => {
    console.log("Api rodando!");
  });
} catch (error) {
  console.log(error);
}
