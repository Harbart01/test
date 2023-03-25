"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const productController_1 = require("../controller/productController");
const auth_1 = require("../middlewares/auth");
// Get product listing
router.get("/list", productController_1.getProducts);
router.post("/enlist", auth_1.auth, productController_1.EnlistProduct);
exports.default = router;
