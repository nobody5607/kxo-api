import Noty from "../models/NotyModel.js";

export const SocketNoty = (socket) => {
  socket.on("join_room_noty", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room noty: ${data}`);
  });

  socket.on("send_message", (data) => {
    if (data) {
      console.log("send_message", data);
      socket.to(data.room).emit("receive_message", data);
    }
  });

  socket.on("save_noty", async (data) => {
    console.log("save_noty");
    const dataObj = {
      target: data.target,
      type: data.type,
      name: data.name,
    };
    const noty = new Noty(dataObj);
    await noty.save();
  });
};
