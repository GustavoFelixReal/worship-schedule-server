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

      const schedules = await Schedule.findAll({ 
        where: { churchId },
        include: [
          { association: 'author', 
            attributes: { 
              exclude: ['password'] 
            } 
          },
          { association: 'maintainer', 
            attributes: { 
              exclude: ['password'] 
            } 
          }
        ],
      });

      return callback({ schedules });
    } catch (err) {
      return socket.emit('exception', { errors: [err]});
    }
  },

  async store(data, socket, io) {
    try {
      const schema = Yup.object().shape({
        churchId: Yup.number().required(),
        name: Yup.string().required().max(255),
        userId: Yup.number().required(),
        date: Yup.date().required()
      });

      await schema.validate(data.params, { abortEarly: false });
    } catch (err) {
      return socket.emit('exception', { errors: err.errors });
    }
  
    try {
      const { churchId, name, userId, date } = data.params;

      const schedule = await Schedule.create({ 
        churchId,
        name,
        date,
        createdBy: userId,
        updatedBy: userId,
      });

      return io.to(churchId).emit('schedule', { schedule });
    } catch (err) {
      return socket.emit('exception', { errors: [err]});
    }
  },

  async find(req, res) {
    try {
      const schema = Yup.object().shape({
        scheduleId: Yup.number().required(),
        churchId: Yup.number().required(),
      });

      await schema.validate(req.params, { abortEarly: false });
    } catch (err) {
      return res.status(406).json(err.errors);
    }

    try {
      const { scheduleId, churchId } = req.params;

      const schedule = await Schedule.findOne({ 
        where: {
          id: scheduleId,
          churchId: churchId
        },
        include: [
          { association: 'author', 
            attributes: { 
              exclude: ['password'] 
            } 
          },
          { association: 'maintainer', 
            attributes: { 
              exclude: ['password'] 
            } 
          }
        ],
      });

      if (!schedule) {
        return res.status(404).json({ error: "Schedule not found" });
      }

      return res.status(200).json({ schedule });
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  },
};