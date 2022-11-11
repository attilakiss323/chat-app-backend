import bcrypt from "bcrypt";
import { db } from "../Models";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const User = db.user;

// signing a user up
// hashing users password before its saved to the database with bcrypt
export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const data = {
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    // saving the user
    const user = await User.create(data);

    // if user details is captured
    // generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET_KEY!, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

      // Send user data
      return res.status(201).send(user);
    } else {
      return res.status(409).send({ error: "Details are not correct" });
    }
  } catch (error) {
    console.log(error);
  }
};

// login authentication
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // find a user by their email
    const user = await User.findOne({ where: { email } });

    // if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      // if password is the same
      // generate token with the user's id and the secretKey in the env file

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET_KEY!, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        // if password matches with the one in the database
        // go ahead and generate a cookie for the user
        res.cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60,
          httpOnly: true,
        });

        // send user data
        return res.status(201).send(user);
      } else {
        return res.status(401).send({ error: "Authentication failed" });
      }
    } else {
      return res.status(401).send({ error: "Authentication failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const signout = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  jwt.sign(authHeader!, "", { expiresIn: 1 }, (logout) => {
    if (logout) {
      res.send({ msg: "You have been Logged Out" });
    } else {
      res.send({ msg: "Logout error" });
    }
  });
};

export const user = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    // find a user by their email
    const user = await User.findOne({ where: { email } });

    // if user email is found return it
    if (user) {
      return res.status(201).send(user);
    } else {
      return res
        .status(401)
        .send({ error: "User not logged in or does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const users = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();

    if (users) {
      return res.status(201).send(users);
    } else {
      res.status(401).send({ error: "Error getting all users" });
    }
  } catch (error) {
    console.log(error);
  }
};
