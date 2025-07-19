import { Server } from "socket.io";
export const useSocket = (server: any) => {
  try {
    const io = new Server(server, {
      cors: { origin: ["http://localhost:5173"] },
    });
    io.on("connection", (socket) => {
      socket.on("message", (data) => {
        console.log("Message socket data", data);
      });
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "useSocket.ts",
      method: "auth/google/callback",
      message: error,
    });
  }
};
