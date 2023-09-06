import express from "express";
import { Server } from "socket.io";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.Router.js";
import handlebars from "express-handlebars";
import ProductManager from "./productManager.js";



const productManager = new ProductManager('./products.json')
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
app.use(express.static("./src/public"));

app.use((req, res, next) => {
  req.context = { socketServer };
  next();
});

app.use("/api/products", productRouter);
app.use("/", viewsRouter);
app.use("/api/carts", cartRouter);


socketServer.on('connection', async (socket) => {
  console.log("Nuevo Cliente", socket.id)
  socket.emit('productos',await productManager.getProducts() )
})