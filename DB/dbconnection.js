const Sequelize = require("sequelize");

const sequelize = new Sequelize("testdb", "root", "Root", {
    dialect: "mysql",
    host: "localhost",
    define:{
        timestamp: false
    }
});

module.exports = sequelize;
