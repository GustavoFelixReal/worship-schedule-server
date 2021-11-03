import Schedule from "../models/Schedule";

import * as Yup from 'yup';

export default {
  async index(data, socket, io) {
    const { churchId } = data.params;

    socket.join(churchId);

    try {
      const schedules = await Schedule.findAll({ where: { churchId } });

      socket.emit('schedules', { schedules });
    } catch (err) {
      socket.emit('get_schedules_error', err.errors.map(err => err.message))
    }
  },

  async store(data, socket, io) {
    try {
      const schema = Yup.object().shape({
        churchId: Yup.number().required(),
        name: Yup.string().required().max(255),
        userId: Yup.number().required()
      });

      await schema.validate(data.params, { abortEarly: false });
    } catch (err) {
      socket.emit('create_schedule_error', err.errors);
    }

    try {
      const { churchId, name, userId } = data.params;

      const schedule = await Schedule.create({ 
        churchId,
        name,
        createdBy: userId,
        updatedBy: userId,
      });

      io.to(churchId).emit('schedule', { schedule });
    } catch (err) {
      socket.emit('create_schedule_error', err.errors.map(err => err.message));
    }
  },

  async find(data) {

  },
};