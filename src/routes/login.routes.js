import Router from "express";
import { login, logout } from "../controller/login.controller.js";

const loginRoutes = Router();

loginRoutes.post("/login", login);
loginRoutes.post("/logout", logout);


export default loginRoutes;