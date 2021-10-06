const  sequelize =  require("../DB/dbconnection")
const Sequelize = require("sequelize");

 const Post = sequelize.define("post",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    articleContent: {
        type: Sequelize.TEXT,
        allowNull: false
    },
})

module.exports = Post
