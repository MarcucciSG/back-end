import fs from "fs";


export default class cartManager {
  constructor() {
    this.item = [];
    this.cart = "./src/cart.json";
  }

  async getCarts() {
    const data = JSON.parse(await fs.promises.readFile(this.cart, "utf-8"));
    return data;
  }

  async getIdCart() {
    let data = await this.getCarts();
    return data.length + 1;
  }

  async addCart(newCart) {
    newCart.id = await this.getIdCart();
    const data = await this.getCarts();
    data.push(newCart);
    await fs.promises.writeFile(this.cart, JSON.stringify(data));
  }

  async getCartById(id) {
    let carts = await this.getCarts();
    let cartFind = carts.find((cart) => cart.id == id);
    return cartFind;
  }

  async addProductsToCart(cid, pid , product){
    try {
        const carts = await this.getCarts();
        const selectedCart = carts[cid - 1];

        if (selectedCart) {
            const cartProducts = selectedCart.products || [];
            const existingProduct = cartProducts.find(prod => prod.id === pid);

            existingProduct ? existingProduct.quantity++ : cartProducts.push({...product, id: pid, quantity: 1})
            
            await fs.promises.writeFile(this.cart, JSON.stringify(carts));
        } else {
            console.log("Cart not found");
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
}


}
