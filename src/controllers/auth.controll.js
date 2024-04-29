
import passport from "passport";

export const home = (req, res) => {
  res.render("home");
};

export const auth = (req, res) => {
  res.send("Estas logeado");
};

export const login = (req, res) => {
  res.render("login");
};

export const logoutPost = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.redirect("/auth/login");
    });
  });
};

export const logout = (req, res) => {
  res.render("logout");
};

export default { auth, logout, login, home };
