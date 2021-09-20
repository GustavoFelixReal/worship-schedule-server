import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const index = require('./routes/index');

app.use(index);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, { 
  cors: {
    origin: '*',
  }
});

export { serverHttp, io };