import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";

export const authRoute:Router = Router()

authRoute.post("/register",register)
authRoute.post("/login",login)
authRoute.get("/logout",logout)

export default authRoute