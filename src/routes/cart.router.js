import { Router } from "express";
const cartRouter = Router();
import cartManager from "../dao/filesystem/cartManager.js";
const manager = new cartManager("./src/carts.json");
import ProductManager from "../dao/filesystem/productManager.js";
const products = new ProductManager("./src/products.json");

let newCart = { id: 0, products: [] };

cartRouter.post("/", async (req, res) => {
  await manager.addCart(newCart);
  res.send("Carrito agregado de manera correcta");
});

cartRouter.get("/:cid", async (req, res) => {
  let id = parseInt(req.params.cid);
  let cartId = await manager.getCartById(id);
  !cartId ? res.send("ID not found") : res.send(cartId.products);
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
