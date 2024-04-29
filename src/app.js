import express from "express";
import session from "express-session";
import passport from "passport";
import db from "./models/db.js";
import googleStrategy from "passport-google-oauth20";
import middleware from "./middlewares/middleware.js";
import authRouters from "./routers/auth.router.js";
import dotenv, { parse } from "dotenv";

dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, SECRET_COOKIE } = process.env;
const pool = db();

const app = express();

//passport secssion
passport.serializeUser((profile, done) => {
  done(null, profile);
});
passport.deserializeUser((profile, done) => {
  done(null, profile);
});

passport.use(
  new googleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, user, done) => {
      done(null, user);
      try {
        const queryResult = await pool.query(
          "SELECT * FROM users WHERE googleid = $1",
          [user.id]
        );

        if (queryResult.rows[0]) {
          done(null, queryResult.rows[0]);
        } else {
          const saveUser = await pool.query(
            "INSERT INTO users (googleid, googlename, googleemail) VALUES ($1, $2, $3) RETURNING *",
            [user.id, user.displayName, user.emails[0].value]
          );
          done(null, saveUser.rows[0]);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use(
  session({
    secret: SECRET_COOKIE,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    },
  })
);

//Iniciar passport
app.use(passport.initialize());
app.use(passport.session());

//Middleware
middleware(app);


//Routers
app.use(authRouters);

app.listen(3000, () => {
  console.log("Server on port " + 3000);
});
