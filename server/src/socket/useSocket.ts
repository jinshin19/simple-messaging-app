import { Server } from "socket.io";
import { MessageSentI } from "../utils/types/socket.types";
export const useSocket = (server: any) => {
  try {
    const io = new Server(server, {
      cors: { origin: ["http://localhost:5173", "http://localhost:3000"] },
    });

    const usersLookup = new Map<string, string>();

    io.on("connect", (socket) => {
      const socketId = socket.id;

      socket.on("register", (user_id: string) =>
        usersLookup.set(user_id, socketId)
      );

      socket.on("message_sent", ({ sender_id, receiver_id }: MessageSentI) => {
        const senderSocket = usersLookup.get(sender_id);
        const receiverSocket = usersLookup.get(receiver_id);
        socket.emit("refresh", true);

        if (receiverSocket) {
          socket.to(receiverSocket).emit("message_received", true);
        }

        if (senderSocket) {
          socket.to(senderSocket).emit("new_message", true);
        }
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
