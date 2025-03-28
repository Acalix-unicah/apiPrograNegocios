'use strict'

const Sequelize = require('sequelize');
require('dotenv').config();

const sequelizeInstance = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.dialect,
    port: process.env.MY_SQL_PORT,
    dialectOptions: {
        connectTimeout: 10000,
    },
    operatorAliases: "false",
    pool: {
        max: parseInt(process.env.POOL_MAX),
        min: parseInt(process.env.POOL_MIN),
        acquire: parseInt(process.env.POOL_ACQUIRE),
        idle: parseInt(process.env.POOL_IDLE)
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelizeInstance = sequelizeInstance;

db.users = require('../models/userModel')(sequelizeInstance, Sequelize);

module.exports = db;