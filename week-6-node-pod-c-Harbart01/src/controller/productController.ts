import { Request, Response } from "express";
import { ProductInstance } from "../model/productModel";
import { v4 as uuidv4 } from "uuid";

export const EnlistProduct = async (req: Request | any, res: Response) => {
  try {
    console.log(req.body);
    const verified = req.user;

    const {
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
      numReviews,
      userId,
    } = req.body;
    const iduuid = uuidv4();

    const product = await ProductInstance.findOne({
      where: { name: name },
    });

    if (!product) {
      let newProduct = await ProductInstance.create({
        id: iduuid,
        ...req.body,
        userId: verified.id,
      });

      return res.status(201).json({
        msg: "Product created successfully",
        newProduct,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductInstance.findAll();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
