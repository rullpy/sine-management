import express from "express";
import { paginaInicial, postPage } from "../controllers/homeController.js";
import testeController from "../controllers/teste.js";

const route = express.Router();

// function middleWare (req, res, next) {
//     console.log('Passei pelo middleware');
//     next(); -> PASSA PRA PROXIMA FUNÇAO
// }

route.get("/", paginaInicial);
route.post("/", postPage);
route.get("/teste/:idUsuarios/", testeController);

export default route;
