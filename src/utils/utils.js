import path from "path";
import passport from "passport";

export const __dirname = path.resolve();

//verify autentication route
export const IsAuthenticated = (req, res, next) => {
  if (req.cookies["connect.sid"] === undefined) {
    return res.redirect("/auth/login");
  }
  
  next();
};

export default {
  IsAuthenticated,
  __dirname,
};
