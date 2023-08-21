const express = require("express");
const ProductManager = requiere("./ProductManager");

const productManager = new ProductManager();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();

  if (limit) {
    return res.send(products.slice(0, limit));
  }
  res.send(products);
});

app.get("/products/:pid", (req, res) => {
  const pid = parseInt(req.params.pid, 10);
  const products = productManager.getProducts();

  const product = products.find(({ id }) => id === pid);
  res.send(product)
});
