import { io, Socket } from "socket.io-client";

export const socket: Socket = io("http://localhost:3001", {
  withCredentials: true,
  // autoConnect: false,
});
