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
import signLoginMensages from "./middlewares/signLoginMensages.js";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

try {
  await mongoose.connect(process.env.DB_KEY);
} catch (error) {
  console.log(error);
}

app.use(helmet());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    secret: "asdkasopdkaowjk31o23kj192o0ikeqi0owjdnasid",
    store: MongoStore.create({
      mongoUrl: process.env.DB_KEY,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  }),
);

app.use(tinyCsrf(process.env.CSRF_SECRET, ["POST", "PUT", "DELETE"]));
app.use(flash());

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(csrf);

app.use(signLoginMensages);

app.use(sessionMiddleware);

app.use(route);

app.use(errorCsrf);

try {
  app.listen(Number(process.env.PORT), () => {
    console.log("Api rodando!");
  });
} catch (error) {
  console.log(error);
}
