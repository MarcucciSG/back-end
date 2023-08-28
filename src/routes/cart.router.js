import express from "express"
import Cart from "../cart.js"

const cart = new Cart();
const router = express.Router();

router.get("/cart", (req, res) =>{
 res.send("todo piola, anda no toques")
})
    








export default router;