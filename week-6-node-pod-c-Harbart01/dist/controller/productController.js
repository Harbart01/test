"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.EnlistProduct = void 0;
const productModel_1 = require("../model/productModel");
const uuid_1 = require("uuid");
const EnlistProduct = async (req, res) => {
    try {
        console.log(req.body);
        const verified = req.user;
        const { name, image, brand, category, description, price, countInStock, rating, numReviews, userId, } = req.body;
        const iduuid = (0, uuid_1.v4)();
        const product = await productModel_1.ProductInstance.findOne({
            where: { name: name },
        });
        if (!product) {
            let newProduct = await productModel_1.ProductInstance.create({
                id: iduuid,
                ...req.body,
                userId: verified.id,
            });
            return res.status(201).json({
                msg: "Product created successfully",
                newProduct,
            });
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.EnlistProduct = EnlistProduct;
const getProducts = async (req, res) => {
    try {
        const products = await productModel_1.ProductInstance.findAll();
        res.status(200).json(products);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getProducts = getProducts;
