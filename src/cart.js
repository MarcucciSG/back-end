import fs from "fs"
import { resolve } from "path";


export default class Cart {
  constructor() {
    this.item = [];
    this.total = 0;
    this.path = "./src/cart.json"
  }

 async getProducts( product, price){
  const getPrice = await this.getPrices(price)

  this.items.push({product, price: getPrice});
  this.total += getPrice;
 }


  async getPrices(price){
    return fs.promises( resolve => {
      setTimeout (()=> {
        const newPrice = price * 1.1;
        resolve(newPrice);

      }, 2000)
    })
  }

  getTotal(){
    return this.total;
  }

}
