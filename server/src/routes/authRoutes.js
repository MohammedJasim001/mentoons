import express from "express";
import { userLogin, userRegister } from "../controller/authController.js";

const routes = express.Router();

routes.post("/register", userRegister);
routes.post("/login", userLogin);

export default routes;
