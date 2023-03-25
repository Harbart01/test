"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("../config/database.config"));
const userModel_1 = require("../model/userModel");
async function recreateUserTable() {
    try {
        await database_config_1.default.query("DROP TABLE IF EXISTS user;");
        await userModel_1.UserInstance.sync();
        console.log("User table recreated successfully.");
    }
    catch (error) {
        console.error("Error recreating user table:", error);
    }
}
recreateUserTable();
