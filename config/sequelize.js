var Sequelize = require('sequelize');
var pg = require('pg').native; //again this line is specific to using a Postgres database
var config = require('../config/dbconfig');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    native: config.native
});