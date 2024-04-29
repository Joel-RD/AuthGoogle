import { Router } from "express";
import passport from "passport";
import { auth, logoutPost, logout, login, home} from "../controllers/auth.controll.js";
import {IsAuthenticated} from "../utils/utils.js";

const router = Router();

router.get("/auth/home", [IsAuthenticated] ,home);

//passport secssion
router.get("/", [
  passport.authenticate("google", { scope: ["email", "profile"] }),
]);

//passport callbackURL
router.get(
  "/auth",
  passport.authenticate("google", { failureRedirect: "/login" }), [IsAuthenticated], auth
);

//Login
router.get("/auth/login",login);

//Logout
router.get("/auth/logout", [IsAuthenticated] ,logout);

//LogoutPost
router.post("/auth/logout", [IsAuthenticated] ,logoutPost);

export default router;
