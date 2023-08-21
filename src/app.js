const express = require("express");
const ProductManager = requiere("./index.js");

const productManager = new ProductManager();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
