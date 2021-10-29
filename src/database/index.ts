import Church from "../models/Church";
import User from "../models/User";

const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

Church.init(connection);
User.init(connection);

Church.associate(connection.models);
User.associate(connection.models);

module.exports = connection;
