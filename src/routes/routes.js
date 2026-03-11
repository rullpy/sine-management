import express from "express";
import { paginaInicial, postPage } from "../controllers/homeController.js";
import testeController from "../controllers/teste.js";

const route = express.Router();

route.get("/", paginaInicial);
route.post("/", postPage);
route.get("/teste/:idUsuarios/", testeController);

export default route;
