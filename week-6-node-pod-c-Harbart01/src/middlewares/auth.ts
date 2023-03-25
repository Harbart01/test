import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { json } from "sequelize";
import { UserInstance } from "../model/userModel";
const jwtsecret = process.env.JWT_SECRET as string;

export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    //Using Cookies for Authentification
    //const authorization = req.cookies.jwt;

    if (!authorization) {
      return res.status(401).json({ error: "Kindly sign in as a user" });
    }

    const token = authorization.slice(7, authorization.length);

    let verified = jwt.verify(token, jwtsecret);

    if (!verified) {
      return res
        .status(401)
        .json({ error: "Token invalid, you can't acces this route" });
    }

    const { id } = verified as { [key: string]: string };

    //find user by id
    const user = await UserInstance.findOne({ where: { id } });

    if (!user) {
      res.status(401).json({ error: "Kindly register/sign in as a user" });
    }

    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "User not logged in" });
  }
}
