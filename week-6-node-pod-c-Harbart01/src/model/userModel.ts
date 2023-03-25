import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { ProductInstance } from "./productModel";

//create an interface
export interface UserAttributes {
  id: string;
  fullName: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  address: string;
}

//create a model
export class UserInstance extends Model<UserAttributes> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "user",
  }
);

UserInstance.hasMany(ProductInstance, { foreignKey: "userId", as: "product" });
ProductInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "user" });
