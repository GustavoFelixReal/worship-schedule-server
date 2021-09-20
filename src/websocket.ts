import { io } from "./http";

const Users = require("../db/models/users");

let interval;

io.on('connection', socket => {
  console.log('New client connected');

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on('disconnet', () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = async (socket) => {
  const users = await Users.findAll();

  const response = { date: new Date().getTime(), users };
  socket.emit('FromApi', response);
};