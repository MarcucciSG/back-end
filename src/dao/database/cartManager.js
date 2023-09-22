import { cartModel } from "../models/cart.model.js";

export default class CartManager {
  async getCarts() {
    const carts = await cartModel.find().lean();
    return carts;
  }

  async addCart(cart) {
    const newCart = await cartModel.create(cart);
    return newCart.id;
  }

  async getCartByid(id) {
    const cart = await cartModel.find({ _id: id }).lean();
    return cart;
  }

  async addProductToCartId(cid, pid) { 
    const cart = await this.getCartById(cid); 

    let item = cart.products.find((p) => p.product == pid); 

    if (item) { 
        item.quantity++; 
    } else { 
        item = { product: pid, quantity: 1 }; 
        cart.products.push(item); 
    } 

    await cart.save(); 
    return item; 
}
}
