import { signup, login, signout, user, users } from "../Controllers";
import { saveUser, isAuthenticated } from "../Middleware/userAuth";
import { Routes } from "./index";
import { Router } from "express";

export const userRoutes = (router: Router) => {
  router.post(Routes.signup, saveUser, signup);

  router.post(Routes.login, login);

  router.post(Routes.signout, signout);

  router.post(Routes.user, isAuthenticated, user);

  router.get(Routes.users, isAuthenticated, users);
};
