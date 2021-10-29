import express from "express";
import session from 'express-session';
import flash from 'express-flash';
import http from "http";
import { Server } from "socket.io";
import "./passport";

const app = express();
const index = require('./routes/index');
const passport = require('passport');

process.env.NODE_ENV !== "production" && require('dotenv').config();

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(index);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, { 
  cors: {
    origin: '*',
  }
});

export { serverHttp, io };