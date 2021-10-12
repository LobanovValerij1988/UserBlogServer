const express = require("express");
const User = require ("./Model/user")
require('dotenv').config();
const Post = require ("./Model/post")
const multer = require('multer');
const cors = require('cors')
const app = express();

const upload = multer();

app.use(cors({
    origin: process.env.CORS_DOMAIN,
}))

app.use( express.static('static'));

const urlencodedParser = express.json();
 app.post("/Login",urlencodedParser,async (request, response)=>{
     try{
         const user =await User.findUserByLoginAndPassword(request.body.name, request.body.password)
         if(!user) {
           response.status(404).send("User not found")
         }
         else{
             response.status(200).json(user)
         }
     }catch (err) {
       console.log(err)
     }
 })

 app.get("/GetPosts",urlencodedParser,async (request, response)=>{
     try {
           const posts = await Post.getAllPostsForUser(request.query.id);
           if(!posts)  {
               response.status(404).send("there is no post on this user")
           }
           else{
               response.status(200).json(posts);
           }

       }
       catch(error){
           console.log(error)
       }
   })


app.post("/SavePost", upload.single('picture'), async (request, response)=>{
     try{
          const errorInFile = await Post.savePost(request.file, request.body.title, request.body.articleContent, request.body.userId )
          if(errorInFile){
                 response.status(400).send(errorInFile)
                 return
             }
          response.status(200).send("article was saved")
        }
     catch (e){
          response.status(500).send(e)
     }
})

app.delete("/DeletePost", urlencodedParser, async (request, response)=>{
    try {
         await Post.deletePostByIdAndFile(request.body.articleId, true);
         response.status(200).send("article was deleted")
     }
     catch (e){
         response.status(500).send(e.name)
     }
})

app.put("/PostUpdate", upload.single('picture'), async (request, response)=>{
    try{
      const errorInFile = await Post.updatePost(request.file, request.body.title, request.body.articleContent, request.body.articleId )
      if(errorInFile){
            response.status(400).send(errorInFile)
            return
        }
        response.status(200).send("article was updated")
    }
    catch(e)  {
            response.status(500).send(e.name)
        }
})

app.listen(process.env.PORT,()=> console.log("server work"))

process.on('SIGTERM', () => {
    app.close(() => {
        console.log("server stopped")
    })
})