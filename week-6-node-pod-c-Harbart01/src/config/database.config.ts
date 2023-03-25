import { Sequelize } from "sequelize";

const db = new Sequelize("app", "", "", {
  storage: "./eCommerce.sqlite",
  dialect: "sqlite",
  logging: false,
});

export default db;
