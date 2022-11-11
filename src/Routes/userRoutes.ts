import express from "express";
import {
  signup,
  login,
  signout,
  user,
  users,
} from "../Controllers/userController";
import { saveUser, isAuthenticated } from "../Middleware/userAuth";
import { Routes } from "./routes";

const router = express.Router();

router.post(Routes.signup, saveUser, signup);

router.post(Routes.login, login);

router.post(Routes.signout, signout);

router.post(Routes.user, isAuthenticated, user);

router.get(Routes.users, isAuthenticated, users);

export default router;
