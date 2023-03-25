"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
const jwtsecret = process.env.JWT_SECRET;
async function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        //Using Cookies for Authentification
        //const authorization = req.cookies.jwt;
        if (!authorization) {
            return res.status(401).json({ error: "Kindly sign in as a user" });
        }
        const token = authorization.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(token, jwtsecret);
        if (!verified) {
            return res
                .status(401)
                .json({ error: "Token invalid, you can't acces this route" });
        }
        const { id } = verified;
        //find user by id
        const user = await userModel_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            res.status(401).json({ error: "Kindly register/sign in as a user" });
        }
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "User not logged in" });
    }
}
exports.auth = auth;
