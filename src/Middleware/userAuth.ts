import { db } from "../Models";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const User = db.user;

// Function to check if email already exist in the database
export const saveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // search the database to see if user exist
  try {
    // checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.status(409).json({ error: "Authentication failed" }).send();
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next("Authentication error!");
    }
    const verify = await jwt.verify(token, process.env.AUTH_SECRET_KEY!);

    req.body.user = await User.findOne({
      where: {
        id: (verify as unknown as JwtPayload).id,
      },
    });
    next();
  } catch (error) {
    return next(error);
  }
};
