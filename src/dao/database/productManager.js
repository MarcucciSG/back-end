import { productModel } from "../models/product.model.js";

export default class ProductManager {
  async getProducts() {
    const products = await productModel.find().lean();
    return products;
  }

  async addProducts(product){
    const newProduct = await productModel.create(product)
    return newProduct.id;
  }

  async getProductstByid(id) {
    const products = await productModel.find({ _id: id }).lean();
    return products;
  }

  async deleteProduct(id){
    const product = await productModel.deleteOne({_id:id});
    return product;
  }
}
