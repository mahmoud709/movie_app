import { Router } from "express";
import { Login, register } from "../controllers/Auth.js";

const route = new Router();

route.post('/register', register)
route.post('/login', Login)


export default route;