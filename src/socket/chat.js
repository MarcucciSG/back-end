import { mensajeModel } from "../dao/models/mensajes.model.js";

const chatEvents = (socketServer) => {
  socketServer.on("connection", (socket) => {
    console.log("se conecto", socket.id);
    socket.on("mensaje", async (data) => {
      await mensajeModel.create(data);
      const mensajes = await mensajeModel.find().lean();
      socketServer.emit("nuevo_mensaje", mensajes);
    });
  });
};

export default chatEvents;
