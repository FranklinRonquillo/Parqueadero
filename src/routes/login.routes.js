import Router from "express";
import { login } from "../controller/login.controller.js";

const loginRoutes = Router();

loginRoutes.post("/", login);

export default loginRoutes;