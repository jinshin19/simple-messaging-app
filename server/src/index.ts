import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { config } from "dotenv";
import http from "http";
config();
import "./auth/google.auth";

import authRouter from "./routes/auth.routes";
import messagesRouter from "./routes/messages.routes";
import { validateAuthorization } from "./middlewares/authorization";
import { useSocket } from "./socket/useSocket";

const PORT = process.env.SIMPLE_MESSAGING_APP_PORT || 4000;
const app = express();
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
useSocket(server);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api", authRouter);
app.use(validateAuthorization);
app.use("/api", messagesRouter);
