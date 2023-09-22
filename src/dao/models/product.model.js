import mongoose from "mongoose";

const productCollection = "products";

const productScheman = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: Number,
  stock: Number,
  status: Boolean,
  category: String,
});

const productModel = mongoose.model(productCollection, productScheman);
export { productModel };
