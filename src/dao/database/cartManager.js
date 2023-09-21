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

  async addProductsToCart(cid) {
    const cart = await this.getCartByid(cid);

    if (cart) {
      return cart.products;
    } else {
      console.log("cart not found");
      return [];
    }
  }
}
