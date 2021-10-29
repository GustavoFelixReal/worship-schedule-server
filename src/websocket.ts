import { io } from "./http";


io.on('connection', socket => {
  console.log(`New client connected. Id: ${socket.id}`);

  socket.on('teste', data => {
    console.log(data)

    io.emit('teste', { notification: data.notification });
  })


  // socket.on('disconnet', () => {
  //   console.log(`Client disconnected.  Id: ${socket.id}`);
  //   clearInterval(interval);
  // });
});

// const getSchedules = async (socket) => {
//   const schedules = await Schedules.findAll();

//   socket.emit('Schedules', schedules);
// };

// const getApiAndEmit = async (socket) => {
//   try {
//     const response = { date: new Date().getTime() };
//     socket.emit('FromApi', response);

//     socket.on('error', () => {
//       socket.emit('FromApi', { date: new Date() });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };