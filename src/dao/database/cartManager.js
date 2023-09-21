import {cartModel} from '../models/cart.model.js'

export default class CartManager{
    async getCarts() {
        const carts = await cartModel.find().lean();
        return carts;
    }


    async addCart(cart){
        const newCart = await cartModel.create(cart);
        return newCart.id;
    }
}