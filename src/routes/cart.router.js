import { Router } from "express";
const cartRouter = Router();
import cartManager from "../dao/database/cartManager.js";
const manager = new cartManager("./src/carts.json");
import ProductManager from "../dao/filesystem/productManager.js";
const products = new ProductManager("./src/products.json");

let newCart = { id: 0, products: [] };

cartRouter.get("/cart/", async (req, res) => {
  try {
    const allCarts = await cartManager.getCarts();
    res.json(allCarts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


cartRouter.get("/:cid", async (req, res) => {
  let id = req.params.cid;
  let cartId = await manager.getCartById(id);
  !cartId ? res.send("ID not found") : res.send(cartId.products);
});

cartRouter.post("/", async (req, res) => {
  await manager.addCart(newCart);
  res.send("Carrito agregado de manera correcta");
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  let cid = parseInt(req.params.cid);
  let pid = parseInt(req.params.pid);
  let totalProducts = await products.getProducts();
  let productId = totalProducts.find((e) => e.id == pid);
  let newProduct = { id: productId.id, quantity: 1 };
  await manager.addProductsToCart(cid, pid, newProduct);

  res.send("Producto añadido al carrito");
});
export default cartRouter;
