import { Request, Response } from "express";
import { UserInstance } from "../model/userModel";
import { v4 as uuidv4 } from "uuid";
import { loginUserSchema, options, registerUserSchema } from "../utils/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET as string;

//Create User Registration
export const Register = async (req: Request, res: Response) => {
  //res.status(200).json({ msg: "Hey, World People!" });
  try {
    const {
      fullName,
      email,
      password,
      confirm_password,
      gender,
      phone,
      address,
    } = req.body; //You can validate with Joi or Zod
    const iduuid = uuidv4();

    //Validate with Joi
    const validationResult = registerUserSchema.validate(req.body, options);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ Error: validationResult.error.details[0].message });
    }

    //Hash Password
    const passwordHash = await bcrypt.hash(password, 8);

    //Create user
    //Check if user exist
    const user = await UserInstance.findOne({
      where: { email: email },
    });

    //await UserInstance.sync({ force: true });
    if (!user) {
      let newUser = await UserInstance.create({
        id: iduuid,
        fullName,
        email,
        password: passwordHash,
        gender,
        phone,
        address,
      });

      //Generate Token for User
      const User = (await UserInstance.findOne({
        where: { email: email },
      })) as unknown as { [key: string]: string };

      const { id } = User;

      const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30mins" });
      // res.cookie("token", token, { httpOnly: true, maxAge: 30 * 60 * 1000 });

      //otp, email

      return res.status(201).json({
        msg: "User created successfully",
        newUser,
        token,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//Create Login for User
export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; //You can validate with Joi or Zod

    //Validate with Joi
    const validationResult = loginUserSchema.validate(req.body, options);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ Error: validationResult.error.details[0].message });
    }

    //Generate Token for User
    const User = (await UserInstance.findOne({
      where: { email: email },
    })) as unknown as { [key: string]: string };

    const { id } = User;

    const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30d" });
    // res.cookie("token", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000,});

    //Determine if user password is valid
    const validUser = await bcrypt.compare(password, User.password);

    if (validUser) {
      return res.status(201).json({
        msg: "You have successfully logged in",
        User,
        token,
      });
    }
    //If not a valid user or with incorrect login details
    return res.status(400).json({ Error: "Invalid email/password" });
  } catch (err) {
    console.log(err);
    //res.status(500).json({ Error: "Internal Server Error" });
  }
};

//Get a list of all users in the database
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserInstance.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
