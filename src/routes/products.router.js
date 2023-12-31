import express from "express";
import ProductManager from "../dao/database/productManager.js";
import { Router } from "express";




const productManager = new ProductManager();
const router = Router();

router.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();

  if (limit) {
    return res.send(products.slice(0, limit));
  }
  res.send(products);
});

router.get("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await productManager.getProductsById(pid);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send();
  }
});

router.post("/products/", async (req, res) => {
  const products = await productManager.getProducts();
  req.context.socketServer.emit('updateProducts', products);
  const { title, description, price, thumbnail, code, stock, status, category } = req.body;
  res.send(
    
    await productManager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    )
  );
      
  if (productManager) {
    res.send(productManager);
  } else {
    res.status(400).send();
  }
});

router.put("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  const updateProductData = req.body;

  await productManager.updateProducts(pid, updateProductData);

  res.send("se pudo actualizar");
});


router.delete("/products/:id", async (req, res) =>{
  const pid = req.params.pid;
  const products = await productManager.getProducts();
  req.context.socketServer.emit('updateProducts', products);

  await productManager.deleteProduct(pid);
  res.send("se borro con exito")
})

export default router;
