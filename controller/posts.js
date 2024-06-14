const  mongoose  = require("mongoose")
const Posts = require('../model/Postmodel')
const User = require('../model/Usermodel')


/*Getting all posts */

const getAllPosts = async (req,res) => {
    try{
        const allPosts = await Posts.find({}).sort({createdAt: -1})
        res.status(200).json(allPosts)
    }
    catch(error){
        res.status(500).json({msg: `server error: ${error}`})
    }
}  

/*function to return one post */

const getOnePost = async (req,res) => {
   const  postId = req.params.id
    if(!mongoose.Types.ObjectId.isValid(postId)){
        return res.status(404).json({msg:"The Id of user does not exist"})
    }
    try{
        const post = await  Posts.findById(postId)
        if(!post){
            res.status(400).json({msg:"There is no such Post"})
        }

        res.status(200).json(post)
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}

/* creating a new post */
const addPost = async (req,res) => {
    const {title, content, author} = req.body
    const user = await User.findById(author);
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

   
   try{
    const newPost = await Posts.create({title, content, author})
    res.status(200).json(newPost)
   }
   catch(error){
    res.status(500).json({msg:error.message})
   }
}

/* updating a post */

const updatePost = async (req,res) => {
    const postId = req.params.id
    const updatedPost = req.body
    if(!mongoose.Types.ObjectId.isValid(postId)){
        return res.status(400).json({msg:'The user Id is invalid'})
    }
   
    try{
        const post = await Posts.findByIdAndUpdate(postId, updatedPost, {new:true, runValidators:true})
        if(!post){
         return res.status(400).json({msg:"No such post"})
        }
        res.status(200).json(post)
        }
        catch(error){
         res.status(500).json({msg:error.message})
        }
}
/*Delete a post */
const deletePost = async (req,res) => {
    postId = req.params.id
    if(!mongoose.Types.ObjectId.isValid(postId)){
        return res.status(404).json({msg:'The id of the user is invalid'})
    }
    try{
        const deletedPost = await Posts.findByIdAndDelete(postId)
        if(!deletePost){
            return  res.status(404).json({error:"Post not found"})
        
        }
        res.status(200).json({msg:'${deletedPost} was deleted successfully'})
    }
    catch(error){
        res.status(500).json({msg:error.message})

    }
}

module.exports = {getAllPosts, getOnePost, deletePost, updatePost, addPost}