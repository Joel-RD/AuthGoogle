import { Router } from "express";{
}
import {
  getProducts,
  getProductsById,
  deleteById,
  createProduct,
  PostcreateProduct,
  getUpdate,
  putUpdayeById,
} from "../controllers/controll.Products.js";

import { IsAuthenticated } from "../utils/utils.js";
import storage from "../middlewares/multer.js";

const router = Router();

// router.get("/", getProducts);
router.get("/products/:id", [IsAuthenticated], getProductsById);
router.post("/create", [IsAuthenticated], storage.single("image") ,PostcreateProduct);
router.get("/create", [IsAuthenticated] ,createProduct);
router.get("/update", [IsAuthenticated] ,getUpdate);
router.post("/update", [IsAuthenticated] ,putUpdayeById); //Tiene que ser con put.
router.post("/:id", [IsAuthenticated] ,deleteById); //Tiene que ser con delete.

export default router;
