import express from "express";
import { signup, login, signout, user } from "../Controllers/userController";
import { saveUser, isAuthenticated } from "../Middleware/userAuth";
import { Routes } from "./routes";

const router = express.Router();

// passing the middleware function to the signup
router.post(Routes.signup, saveUser, signup);

router.post(Routes.login, login);

router.post(Routes.signout, signout);

router.post(Routes.user, isAuthenticated, user);

export default router;
