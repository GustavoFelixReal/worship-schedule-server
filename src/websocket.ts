import { io } from "./http";

import ScheduleController from "./controllers/ScheduleController";

io.on('connection', socket => {
  console.log(`New client connected. Id: ${socket.id}`);

  socket.on('join_church', (data, callback) => ScheduleController.index(data, callback, socket, io));

  socket.on('create_schedule', data => ScheduleController.store(data, socket, io));
});