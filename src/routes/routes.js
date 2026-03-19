import express from "express";

import { homePageIndex } from "../controllers/homeController.js";
import { loginControllerIndex, loginControllerRegister, loginControllerLogout } from "../controllers/loginController.js";
import { signControllerIndex, signControllerRegister } from "../controllers/signController.js";
import { contatoController, contatoControllerRegister, editContatoController, editController } from "../controllers/contatoController.js";

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
route.post("/contato/edit/:id", loginRequired, editController)

export default route;
