import express from "express";
import { homePageIndex } from "../controllers/homeController.js";
import { loginControllerIndex, loginControllerRegister, loginControllerLogout } from "../controllers/loginController.js";
import { signControllerIndex, signControllerRegister } from "../controllers/signController.js";

const route = express.Router();

route.get("/", homePageIndex);

route.get("/login", loginControllerIndex);
route.post("/login/register", loginControllerRegister);
route.get("/login/logout", loginControllerLogout);

route.get("/sign-up", signControllerIndex);
route.post("/sign-up/register", signControllerRegister);

export default route;
