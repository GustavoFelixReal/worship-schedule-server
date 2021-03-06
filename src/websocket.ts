import { io } from "./http";

import ScheduleController from "./controllers/ScheduleController";
import ScheduleItemController from "./controllers/ScheduleItemController";

io.on('connection', socket => {
  console.log(`New client connected. Id: ${socket.id}`);

  socket.on('join_church', (data, callback) => ScheduleController.index(data, callback, socket, io));

  socket.on('create_schedule', data => ScheduleController.store(data, socket, io));
  
  socket.on('get_schedule_items', (data, callback) => ScheduleItemController.index(data, callback, socket, io));
});