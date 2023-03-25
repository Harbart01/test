import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

//create a product interface
export interface ProductAttributes {
  id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  userId: string;
}

//Create a model
export class ProductInstance extends Model<ProductAttributes> {}

ProductInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    countInStock: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    numReviews: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "product",
  }
);
