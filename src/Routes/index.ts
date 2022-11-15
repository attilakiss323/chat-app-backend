import express from "express";
import { userRoutes } from "./userRoutes";
import { conversationRoutes } from "./conversationRoutes";

const router = express.Router();

export enum Routes {
  // User routes
  login = "/login",
  signup = "/signup",
  signout = "/signout",
  user = "/user",
  users = "/users",
  // Conversation routes
  conversation = "/conversation",
}

userRoutes(router);
conversationRoutes(router);

export default router;
