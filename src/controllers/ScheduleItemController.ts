import ScheduleItem from "../models/ScheduleItem";

import * as Yup from "yup";

export default {
  async index(data, callback, socket, io) {
    try {
      const schema = Yup.object().shape({
        churchId: Yup.number().required(),
        scheduleId: Yup.number().required(),
      });

      await schema.validate(data.params);
    } catch (err) {
      return socket.emit('exception', { errors: err.errors });
    }

    try {
      const { scheduleId } = data.params;

      const scheduleItems = ScheduleItem.findAll({ 
        where: { scheduleId },
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

      return callback({ scheduleItems });
    } catch (err) {
      return socket.emit('exception', { errors: [err]});
    }
  },

  async store(data, socket, io) {
    
  }
};