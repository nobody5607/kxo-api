export const SocketChat = (socket) => {
  socket.on("join_room_chat", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room noty: ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
};
