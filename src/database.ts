import database from "../db/models/index";

(async () => {
  const Notes = require("../db/models/notes");

  const Schedules = require("../db/models/schedules");
  const ScheduleStatus = require("../db/models/schedule-status");

  const ScheduleItems = require("../db/models/schedule-items");
  const ScheduleItemsStatus = require("../db/models/schedule-items-status");
  const ScheduleItemsTypes = require("../db/models/schedule-items-types");

  const Users = require("../db/models/users");

  await database.sync();
})();
