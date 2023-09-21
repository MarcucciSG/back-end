import express from "express";
import { Server } from "socket.io";
import { Socket } from "socket.io";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.Router.js";
import handlebars from "express-handlebars";
import ProductManager from "./dao/filesystem/productManager.js";
import mongoose from "mongoose";
import chatEvents from "./socket/chat.js";

mongoose.connect(
  "mongodb+srv://marcuccisantiago8:6DkBMXU3lAE3TPUU@cluster0.fehywwf.mongodb.net/?retryWrites=true&w=majority"
);

const productManager = new ProductManager("./products.json");
const app = express();
const sv = app.listen(8080, () =>
  console.log("listo servidor en localhost: 8080")
);
sv.on("error", (error) => console.log(error));
const socketServer = new Server(sv);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use("/static", express.static("./src/public"));

app.use((req, res, next) => {
  req.context = { socketServer };
  next();
});

app.use("/api", productRouter);
app.use("/", viewsRouter);
app.use("/api", cartRouter);

socketServer.on("connection", async (socket) => {
  console.log("Nuevo Cliente", socket.id);
  socket.emit("productos", await productManager.getProducts());

  const product = new ProductManager("/products.json");
  socket.on("newProduct", async (productPost) => {
    await product.addProduct(
      productPost.id,
      productPost.title,
      productPost.description,
      productPost.price,
      productPost.thumbnail,
      productPost.code,
      productPost.stock,
      productPost.status,
      productPost.category
    );
    socketServer.emit("productos", await product.getProducts());
  });

  socket.on("deleteProduct", async (data) => {
    const idToDelete = parseInt(data.idDeleteFromSocketClient, 10);
    console.log(`Solicitud de eliminación recibida del cliente:`, idToDelete);
    await product.deleteProduct(idToDelete);
    socketServer.emit("Socket-Products", await product.getProducts());
  });

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado con ID: ${socket.id}`);
  });
});

socketServer.on("connection", (socket) => {
  console.log("se conecto", socket.id);
  socket.on("mensaje", async (data) => {
    await mensajeModel.create(data);
    const mensajes = await mensajeModel.find().lean();
    socketServer.emit("nuevo_mensaje", mensajes);
  });
});

chatEvents(socketServer);
