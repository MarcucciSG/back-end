import  {Router} from "express";
import ProductManager from "../dao/filesystem/productManager.js";

const productManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home",{products})
});

router.get("/realtimeproducts", async (req, res) => {
  const product = await productManager.getProducts()
        res.render("realTimeProducts", {});
  });

  router.get("/chat", (req, res) => res.render('chat',{}));



export default router