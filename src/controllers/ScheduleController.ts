import Schedule from "../models/Schedule";

import * as Yup from 'yup';

export default {
  async index(data, callback, socket, io) {
    try {
      const schema = Yup.object().shape({
        churchId: Yup.number().required(),
      });

      await schema.validate(data.params, { abortEarly: false });
    } catch (err) {
      return socket.emit('exception', { errors: err.errors });
    }

    try {
      const { churchId } = data.params;

      socket.join(churchId);

      const schedules = await Schedule.findAll({ where: { churchId } });

      callback({ schedules });
    } catch (err) {
      return socket.emit('exception', { errors: [err]});
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
      return socket.emit('exception', { errors: err.errors });
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
      return socket.emit('exception', { errors: [err]});
    }
  },

  async find(data) {

  },
};