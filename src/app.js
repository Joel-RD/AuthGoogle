import express from "express";
import rootProducts from "./routers/routers,products.js";
import middleware from "./middlewares/middleware.js";
import db from "../src/models/db.js"

db();
const app = express();

//Middleware
middleware(app);

//Routers
app.use(rootProducts)

app.listen(3000, () => {
    console.log("Server on port " + 3000);
})
