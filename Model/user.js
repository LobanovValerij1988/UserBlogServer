const  Post  = require("./post");
const Sequelize = require("sequelize");
const sequelize = require("../DB/dbconnection")

const User = sequelize.define("user",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

User.hasMany(Post)


 module.exports = User