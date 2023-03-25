"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.Login = exports.Register = void 0;
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
//Create User Registration
const Register = async (req, res) => {
    //res.status(200).json({ msg: "Hey, World People!" });
    try {
        const { fullName, email, password, confirm_password, gender, phone, address, } = req.body; //You can validate with Joi or Zod
        const iduuid = (0, uuid_1.v4)();
        //Validate with Joi
        const validationResult = utils_1.registerUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ Error: validationResult.error.details[0].message });
        }
        //Hash Password
        const passwordHash = await bcryptjs_1.default.hash(password, 8);
        //Create user
        //Check if user exist
        const user = await userModel_1.UserInstance.findOne({
            where: { email: email },
        });
        //await UserInstance.sync({ force: true });
        if (!user) {
            let newUser = await userModel_1.UserInstance.create({
                id: iduuid,
                fullName,
                email,
                password: passwordHash,
                gender,
                phone,
                address,
            });
            //Generate Token for User
            const User = (await userModel_1.UserInstance.findOne({
                where: { email: email },
            }));
            const { id } = User;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30mins" });
            // res.cookie("token", token, { httpOnly: true, maxAge: 30 * 60 * 1000 });
            //otp, email
            return res.status(201).json({
                msg: "User created successfully",
                newUser,
                token,
            });
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
//Create Login for User
const Login = async (req, res) => {
    try {
        const { email, password } = req.body; //You can validate with Joi or Zod
        //Validate with Joi
        const validationResult = utils_1.loginUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ Error: validationResult.error.details[0].message });
        }
        //Generate Token for User
        const User = (await userModel_1.UserInstance.findOne({
            where: { email: email },
        }));
        const { id } = User;
        const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30d" });
        // res.cookie("token", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000,});
        //Determine if user password is valid
        const validUser = await bcryptjs_1.default.compare(password, User.password);
        if (validUser) {
            return res.status(201).json({
                msg: "You have successfully logged in",
                User,
                token,
            });
        }
        //If not a valid user or with incorrect login details
        return res.status(400).json({ Error: "Invalid email/password" });
    }
    catch (err) {
        console.log(err);
        //res.status(500).json({ Error: "Internal Server Error" });
    }
};
exports.Login = Login;
//Get a list of all users in the database
const getUsers = async (req, res) => {
    try {
        const users = await userModel_1.UserInstance.findAll();
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getUsers = getUsers;
