import express from "express";
import { signup, login } from "../Controllers/userController";
import { saveUser } from "../Middleware/useAuth";
import { Routes } from "./routes";

const router = express.Router();

// signup endpoint
// passing the middleware function to the signup
router.post(Routes.signup, saveUser, signup);

// login route
router.post(Routes.login, login);

export default router;
