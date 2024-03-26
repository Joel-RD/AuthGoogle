import { Router } from "express";
import {
  getProducts,
  getProductsById,
  deleteById,
  createProduct,
  PostcreateProduct,
  getUpdate,
  putUpdayeById,
} from "../controllers/controll.Products.js";

const router = Router();

router.get("/", getProducts);
router.get("/products/:id", getProductsById);
router.post("/create", PostcreateProduct);
router.get("/create", createProduct);
router.get("/update", getUpdate);
router.post("/update", putUpdayeById); //Tiene que ser con put.
router.post("/:id", deleteById); //Tiene que ser con delete.

export default router;
