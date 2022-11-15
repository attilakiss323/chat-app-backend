import { conversation } from "../Controllers";
import { isAuthenticated } from "../Middleware/userAuth";
import { Routes } from "./index";
import { Router } from "express";

export const conversationRoutes = (router: Router) => {
  router.post(Routes.conversation, isAuthenticated, conversation);
};
