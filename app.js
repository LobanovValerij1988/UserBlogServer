const express = require("express");
const User = require ("./Model/user")
require('dotenv').config();
const Post = require ("./Model/post")
const cors = require('cors')
const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}))

const urlencodedParser = express.json();

 app.post("/Login",urlencodedParser,async (request, response)=>{
     try{
         const name = request.body.name;
         const password = request.body.password;
         const user =await   User.findOne({where:{name: name, password : password}})
         if(!user)
         {
           response.status(404)
           response.send("User not found")
         }
         else{
             response.status(200);
             response.json(user)
         }
     } catch (err) {
         console.log(err)
     }

 })

 app.get("/GetPosts",urlencodedParser,async (request, response)=>{
       try {
           const userId = request.query.id;
           const posts = await Post.findAll({where: {userId: userId}});
           if(!posts)
           {
               response.status(404)
               response.send("there is no post on this user")
           }
           else{
               response.status(200);
               response.json(posts)
           }

       }
       catch(error){
           console.log(err)
       }
   })

app.post("/SavePost",urlencodedParser, (request, response)=>{
    const title = request.body.title;
    const articleContent = request.body.articleContent;
    const userId= request.body.userId;
    Post.create({title: title, articleContent : articleContent, userId: userId}).
    then(()=>{
        response.status(200)
        response.send("article was saved")
    }).catch((e)=>{
        response.status(500);
        response.send(e.name)
    })
})

app.delete("/DeletePost",urlencodedParser, (request, response)=>{
    const articleId= request.body.articleId;
    console.log(articleId,"article Id")
    Post.destroy({where:{id: articleId }}).
    then(()=>{
        response.status(200)
        response.send("article was daleted")
    }).catch((e)=>{
        response.status(500);
        response.send(e.name)
    })
})

app.put("/PostUpdate",urlencodedParser, (request, response)=>{
    const articleId= request.body.articleId;
    const title = request.body.title;
    const articleContent = request.body.articleContent;
    Post.update({title: title, articleContent: articleContent}, {where: {id: articleId }}).
    then(()=>{
        response.status(200)
        response.send("article was updated")
    }).catch((e)=>{
        response.status(500);
        response.send(e.name)
    })
})

app.listen(process.env.PORT,()=> console.log("server work"))
process.on('SIGTERM', () => {
    app.close(() => {
        console.log("server stopped")
    })
})