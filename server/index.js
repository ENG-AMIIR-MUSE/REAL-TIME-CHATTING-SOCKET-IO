import path from "path";
import authRoute from "./routes/auth-routes.js";
import messageRoute from "./routes/message-route.js";
import usersRoute from "./routes/users-route.js";
import { setConnection } from "./config/db.config.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { app, server } from "./socket/socket.js";
dotenv.config();

const dirname = path.resolve();
console.log("dirname ", dirname);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 3000;

setConnection(process.env.MONGO_URL);
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", usersRoute);

app.use(express.static(path.join(dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "frontend", "dist", "index.html"));
});
server.listen(port, () => {
  console.log(`server is runnign on port `, port);
});
