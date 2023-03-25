import express from "express";
const router = express.Router();
import { getProducts, EnlistProduct } from "../controller/productController";
import { auth } from "../middlewares/auth";

// Get product listing
router.get("/list", getProducts);
router.post("/enlist", auth, EnlistProduct);

export default router;
