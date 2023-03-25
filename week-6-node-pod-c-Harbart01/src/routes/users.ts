import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import { getUsers, Login, Register } from "../controller/userController";

/* GET users listing. */
router.get("/", getUsers);
router.post("/register", Register);
router.post("/login", Login);
export default router;
