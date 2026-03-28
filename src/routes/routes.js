import express from "express";

import { homePageIndex } from "../controllers/homeController.js";
import { loginControllerIndex, loginControllerRegister, loginControllerLogout } from "../controllers/loginController.js";
import { signControllerIndex, signControllerRegister } from "../controllers/signController.js";
import { contatoController, contatoControllerRegister, editContatoController, editController, deleteContatoController } from "../controllers/contatoController.js";
import { vagasController, vagasCriarController, vagasListaController, editVagaController, editVagaPostController, deleteVagaController } from "../controllers/vagaController.js";

import loginRequired from "../middlewares/loginRequired.js";

const route = express.Router();

route.get("/", homePageIndex);

route.get("/sign-up", signControllerIndex);
route.post("/sign-up/register", signControllerRegister);

route.get("/login", loginControllerIndex);
route.post("/login/register", loginControllerRegister);
route.get("/login/logout", loginControllerLogout);

route.get("/contato", loginRequired, contatoController);
route.post("/contato/register", loginRequired, contatoControllerRegister);
route.get("/contato/:id", loginRequired, editContatoController);
route.post("/contato/edit/:id", loginRequired, editController);
route.get("/contato/delete/:id", loginRequired, deleteContatoController);

route.get("/contato/cria-vaga/:id", loginRequired, vagasController);
route.post("/contato/vaga-criada/:id", loginRequired, vagasCriarController);
route.get("/contato/list-vagas/:id", loginRequired, vagasListaController);
route.get("/contato/:empresaId/vaga/:vagaId", loginRequired, editVagaController);
route.post("/contato/:empresaId/vaga/edit/:id", loginRequired, editVagaPostController)
route.get("/contato/vaga/:empresaId/delete/:vagaId", loginRequired, deleteVagaController)

export default route;
