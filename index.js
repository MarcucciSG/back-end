class productManager {
  constructor() {
    this.products;
    this.autoId = 0;
  }
}

addProducts(title, description, price, thumbnail, code, stock);
{
  const newProduct = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    id: this.autoId + 1,
  };

  const validateCode = this.products.find(
    (product) => product.code === newProduct.code
  );
  if (validateCode) {
    console.log("Error, el codigo ingresado ya esta en uso");
  } else {
    this.products.push(newProduct);
    this.lastId++;
  }
}

getProducts();
{
  console.log(this.products);
}

