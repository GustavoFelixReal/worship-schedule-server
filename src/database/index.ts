import Church from "../models/Church";
import User from "../models/User";
import Schedule from "../models/Schedule";

const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

Church.init(connection);
User.init(connection);
Schedule.init(connection);

Church.associate(connection.models);
User.associate(connection.models);
Schedule.associate(connection.models);

module.exports = connection;
