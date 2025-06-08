import express from "express";
import { userLogin, userLogout, userRegister } from "../controller/authController.js";

const routes = express.Router();

routes.post("/register", userRegister);
routes.post("/login", userLogin);
routes.post('/logout',userLogout)

export default routes;
