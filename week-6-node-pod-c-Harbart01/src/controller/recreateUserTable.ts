import db from "../config/database.config";
import { UserInstance } from "../model/userModel";

async function recreateUserTable() {
  try {
    await db.query("DROP TABLE IF EXISTS user;");
    await UserInstance.sync();
    console.log("User table recreated successfully.");
  } catch (error) {
    console.error("Error recreating user table:", error);
  }
}

recreateUserTable();
