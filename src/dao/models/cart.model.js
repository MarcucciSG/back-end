import mongoose from "mongoose";

const cartCollection = "carts";

const cartScheman = new mongoose.Schema({
  products: [
    {
      id: String,
      quantity: Number,
    },
  ],
});

const cartModel = mongoose.model(cartCollection, cartScheman);
export { cartModel };
