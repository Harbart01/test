import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

//Pages
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("Home");
});

router.get("/register", (req: Request, res: Response, next: NextFunction) => {
  res.render("Register");
});

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  res.render("Login");
});

export default router;
