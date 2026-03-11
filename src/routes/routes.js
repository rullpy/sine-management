import express from "express";
import { paginaInicial, postPage } from "../controllers/homeController.js";
import testeController from "../controllers/teste.js";

const route = express.Router();

export const homePage = route.get("/", paginaInicial);
export const postPagina = route.post("/", postPage);

export const teste = route.get("/teste/:idUsuarios/", testeController);
