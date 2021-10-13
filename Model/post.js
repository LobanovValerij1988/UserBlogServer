const  sequelize =  require("../DB/dbconnection")
const { Sequelize } = require("sequelize");
const fs = require("fs");
const fileWorker = require("../helpers/fileHelper");

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
     picture:{
        type: Sequelize.STRING,
         allowNull: true
     }
})

async function deletePostByIdAndFile (articleId, isDeletePost = true) {
        const post = await Post.findOne({where: {id: articleId}})
        const deletingFilePath = post.picture ? "./static" + post.picture : null
        if(isDeletePost) {
            await Post.destroy({where: {id: articleId}})
        }
        if (deletingFilePath) {
            fs.unlink(deletingFilePath, (err) => {
                if (err) console.log(err);
                else console.log(`${deletingFilePath} was deleted`);
            });
        }
}

//queryInterface.addColumn("posts","picture", {type: DataTypes.BLOB})
// queryInterface.changeColumn('posts', 'picture', {
//     type: DataTypes.STRING,
//     allowNull: true
// });

async function getAllPostsForUser(userId){
    return await Post.findAll({where: {userId: userId}});
}

async function savePost (file, title, articleContent, userId) {
    let fileName = null
        if (file) {
            const errorInFile =await fileWorker.isFileCorrect(file);
            if(errorInFile){
                throw new Error(errorInFile);
            }
            fileName = await fileWorker.saveFileFromRequest(file)
        }
      return await Post.create({title: title, articleContent: articleContent, userId: userId, picture: fileName})
}

async  function  updatePost (file, title, articleContent, articleId ) {
    if(file){
        const errorInFile =await fileWorker.isFileCorrect(file);
        if(errorInFile){
             throw new Error(errorInFile);
        }
        await deletePostByIdAndFile(articleId,false)
        const fileNameNew = await fileWorker.saveFileFromRequest(file);
        return await Post.update({title: title, articleContent: articleContent,picture: fileNameNew }, {where: {id: articleId }})
     }
    else {
       await Post.update({ title: title, articleContent: articleContent }, {where: {id: articleId}})
    }
}

async  function findPostById(articleId){
     return await Post.findOne({where:{id: articleId}})
}

module.exports.getAllPostsForUser = getAllPostsForUser
module.exports.deletePostByIdAndFile = deletePostByIdAndFile;
module.exports.savePost = savePost;
module.exports.updatePost = updatePost;
module.exports.findPostById = findPostById
module.exports.Post = Post;