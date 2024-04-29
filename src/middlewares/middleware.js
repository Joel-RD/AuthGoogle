import express from "express";
import exphbs from "express-handlebars";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { __dirname } from "../utils/utils.js";
import path from "path";


const app = express();

export const middleware = (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  //Configuración de Handlebars
  app.engine("handlebars", exphbs.engine());
  app.set("view engine", "handlebars");
  app.set("views", path.join(__dirname, "src/views"));

  //Configuración de archivos estáticos
  app.use(express.static(path.join(__dirname, "src/public")));
  app.use(express.static(path.join(__dirname, "src/public/uploads")));
};

export default middleware;
