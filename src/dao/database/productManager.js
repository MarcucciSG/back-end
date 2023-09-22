import { productModel } from "../models/product.model.js";

export default class ProductManager {
  async getProducts() {
    const products = await productModel.find().lean();
    return products;
  }

  async addProducts(product){
    const newProduct = await productModel.create(product)
    const data = await this.getProducts();
    const repeatCode = data.some((e) => e.code == newProduct.code);
    repeatCode == true
      ? console.log("El codigo esta repetido")
      : data.push({ ...newProduct, id: await this.getId() });
    return newProduct.id;

  }

  async getProductstByid(id) {
    const products = await productModel.find({ _id: id }).lean();
    return products;
  }

  async deleteProduct(id){
    const product = await productModel.findByIdAndDelete({_id:id});
    return product;
  }

  async updateProducts(id, obj){
    await productModel.updateOne({_id:id}, obj).lean();
    return obj

  }
}
