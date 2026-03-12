import express from "express";
import "dotenv/config";
import route from "./routes/routes.js";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

try {
  await mongoose.connect(process.env.DB_KEY);
} catch (error) {
  console.log(error);
}

app.use(express.urlencoded({ extended: true })); // Trata o POST
app.use(express.static(path.resolve(__dirname, "..", "public"))); //PASSANDO OS ARQUIVOS ESTATICOS

// CONFIGURA O LINK DA API COM O EJS
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs"); // CONFIGURA A ENGINE

// ROTAS
app.use(route);

try {
  app.listen(Number(process.env.PORT), () => {
    console.log("Api rodando!");
  });
} catch (error) {
  console.log(error);
}
