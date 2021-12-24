import ScheduleItem from "../models/ScheduleItem";

import * as Yup from "yup";

export default {
  async index(data, callback, socket, io) {
    try {
      const schema = Yup.object().shape({
        churchId: Yup.number().required(),
        scheduleId: Yup.number().required(),
      });

      await schema.validate(data.params, { abortEarly: false });
    } catch (err) {
      return socket.emit('exception', { errors: err.errors });
    }

    try {
      const { scheduleId } = data.params;

      const scheduleItems = ScheduleItem.findAll({ 
        where: { scheduleId, deleted: false },
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
        orderBy: 'order'
      });

      return callback({ scheduleItems });
    } catch (err) {
      return socket.emit('exception', { errors: [err]});
    }
  },

  async store(data, socket, io) {
    try {
      const schema = Yup.object().shape({
        churchId: Yup.number().required(),
        scheduleId: Yup.number().required(),
        userId: Yup.number().required(),
        type: Yup.string().required(),
        name: Yup.string().required(),
        order: Yup.number().required(),
        fileName: Yup.string().required()
      });

      await schema.validate(data.params, { abortEarly: false });
    } catch (err) {
      return socket.emit('exception', { errors: err.errors });
    }

    try {
      const { churchId, scheduleId, userId, type, name, order, fileName } = data.params;

      const scheduleItem = ScheduleItem.create({ 
        scheduleId, 
        type, 
        name, 
        order, 
        fileName,
        createdBy: userId,
        updatedBy: userId
      });

      io.to(churchId).emit(`schedule_item_${scheduleId}`, { scheduleItem });
    } catch (err) {
      return socket.emit('exception', { errors: [err]});
    }
  }
};