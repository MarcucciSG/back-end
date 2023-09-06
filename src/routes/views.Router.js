import express from "express";
import ProductManager from "../productManager.js";

const productManager = new ProductManager();
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
        res.render("realTimeProducts", {});
  });



export default router