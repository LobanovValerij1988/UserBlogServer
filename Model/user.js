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

User.hasMany(Post.Post)

async function findUserByLoginAndPassword (login,password){
    return  await User.findOne({where:{name: login, password : password}})
}

 module.exports.findUserByLoginAndPassword = findUserByLoginAndPassword;