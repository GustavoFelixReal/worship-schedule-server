import { initializePassport } from "./config/passport";
import User from "./models/User";

const passport = require("passport");

initializePassport(passport, async (userName) => {
  const user = await User.findOne({
    where: { userName },
  });

  console.log(user);

  return user;
});