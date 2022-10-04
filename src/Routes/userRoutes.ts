import express from "express";
import { signup, login } from "../Controllers/userController";
import { saveUser } from "../Middleware/useAuth";

const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", saveUser, signup);

//login route
router.post("/login", login);

export default router;
