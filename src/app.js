import express from "express";
import "dotenv/config";
import { homePage, teste, postPagina } from "./routes/routes.js";

const app = express();

app.use(express.urlencoded({ extended: true })); // Trata o POST

app.use(homePage);
app.use(teste);
app.use(postPagina);

try {
  app.listen(Number(process.env.PORT), () => {
    console.log("Api rodando!");
  });
} catch (e) {
  console.log(e);
}
