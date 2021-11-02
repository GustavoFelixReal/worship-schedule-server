import { initializePassport } from "./config/passport";
import User from "./models/User";

const passport = require("passport");

initializePassport(passport, 
  async (userName) => {
    const user = await User.findOne({
      where: { userName },
    });

    return user;
  },

  async (id) => {
    const user = await User.findByPk(id);

    console.log(id, user)

    return user;
  }
);