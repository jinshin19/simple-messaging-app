import { Server } from "socket.io";
import { MessageSentI } from "../utils/types/socket.types";
import { getCookie } from "../helper/cookie.helper";
import { extractTokenData } from "../helper/token.helper";
import { updateUserStatus } from "../helper/user.helper";
export const useSocket = (server: any) => {
  try {
    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:5173", "http://localhost:3000"],
        credentials: true,
      },
      pingInterval: 5000,
      pingTimeout: 25000,
    });

    const usersOnlines = new Map<string, Set<string>>();
    const usersLookup = new Map<string, string>();

    io.on("connect", (socket) => {
      const socketId = socket.id;

      socket.on("disconnect", async (reason) => {
        const cookie = socket.handshake.headers.cookie;
        const accessToken = getCookie(cookie, "SMA-accessToken");
        const refreshToken = getCookie(cookie, "refreshToken");
        const data = extractTokenData({ token: accessToken || refreshToken });

        for (let [user_id, sockets] of usersOnlines.entries()) {
          if (sockets.has(socketId)) {
            sockets.delete(socketId);
          }

          if (sockets.size === 0) {
            const updated = await updateUserStatus(user_id, false);
            if (updated === true) {
              io.emit("user-status-refresh", true);
            }
          }
        }
      });

      socket.on("register", (user_id: string) =>
        usersLookup.set(user_id, socketId)
      );

      socket.on("user-online", async (user_id: string) => {
        const has = usersOnlines.has(user_id);
        if (!has) {
          usersOnlines.set(user_id, new Set());
        }
        usersOnlines.get(user_id)?.add(socketId);
        const size = usersOnlines.get(user_id)?.size;
        if (size === 1) {
          const updated = await updateUserStatus(user_id, true);
          if (updated === true) {
            socket.broadcast.emit("user-status-refresh", true);
          }
        }
      });

      socket.on("message_sent", ({ sender_id, receiver_id }: MessageSentI) => {
        const senderSocket = usersLookup.get(sender_id);
        const receiverSocket = usersLookup.get(receiver_id);

        if (receiverSocket) {
          socket.to(receiverSocket).emit("message_received", true);
        }

        if (senderSocket) {
          socket.to(senderSocket).emit("new_message", true);
        }
        socket.emit("refresh", true);
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
