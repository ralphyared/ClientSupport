import "dotenv/config";
import http from "http";
import express from "express";
import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userRoutes from "./modules/users/user.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import complaintRoutes from "./modules/complaints/complaint.routes.js";
import { Server } from "socket.io";
import { socketInit } from "./global/utils.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server);

socketInit(io);

app.set("io", io);

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const messages = status == 400 ? error.messages : [error.message];
  res.status(status).send({ messages });
};

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL!);
};

try {
  connectDB();
  console.log("App successfully connected to database");
} catch (err) {
  throw err;
}

app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use("/category", categoryRoutes);

app.use("/complaint", complaintRoutes);

app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`App listening at port ${process.env.PORT}...`);
});
