import { Server } from "socket.io";
export const useSocket = (server: any) => {
  try {
    const io = new Server(server, {
      cors: { origin: ["http://localhost:5173", "http://localhost:3000"] },
    });
    io.on("connect", (socket) => {
      const id = socket.id;
      socket.on("message", (data) => {
        socket.emit("new_message", true);
        console.log("message", {
          id,
          data,
        });
      });
    });
    return io;
  } catch (error) {
    console.log("Error found:", {
      file_path: "useSocket.ts",
      method: "auth/google/callback",
      message: error,
    });
  }
};
