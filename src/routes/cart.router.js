import express from "express";
import cartManager from "../cartManager.js";
import ProductManager from "../productManager.js";

const products = new ProductManager ("./src/products.json")
const cart = new cartManager();
const manager = new cartManager("./src/cart.json");
const router = express.Router();

const newCart = {id: 0, products: []}

router.post("/", async (req, res) => {
  await manager.addCart(newCart);
  res.send("Cart agregado");
});


router.get("/:cid", async(req, res) => {
    const cid = parseInt(req.params.cid, 10);
    const cartId = await manager.getCartById(cid);
    !cartId ? res.send("id not found") : res.send(cartId.products)


})



export default router;
