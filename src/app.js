import express from "express";
import productRouter from "./routes/products.router.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.Router());
app.use("/api", productRouter);



app.listen(8080, () => console.log("servidor iniciado en puerto 8080"));
