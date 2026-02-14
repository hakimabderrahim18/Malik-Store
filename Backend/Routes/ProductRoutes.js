import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/productController.js";

const routerProduct = express.Router();

routerProduct.get("/", getProducts);
routerProduct.post("/", createProduct);
routerProduct.get("/:id", getProduct);
routerProduct.put("/:id", updateProduct);
routerProduct.delete("/:id", deleteProduct);

export default routerProduct;
