import express from "express";
import "dotenv/config";
import route from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true })); // Trata o POST
app.use(express.static(path.resolve(__dirname, "public")))

// CONFIGURAÇÕES PRIMEIRO
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// ROTAS
app.use(route);

try {
  app.listen(Number(process.env.PORT), () => {
    console.log("Api rodando!");
  });
} catch (e) {
  console.log(e);
}
