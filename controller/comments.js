const mongoose  = require('mongoose')
const Comment = require('../model/Commentmodel')
const Posts = require('../model/Postmodel')

const getAllComments = async (req,res) =>{
    try{
        const comments = await Comment.find({}).sort({createdAt: -1})
        res.status(200).json(comments)
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}

const createComment = async (req,res) =>{
    const{content, author, post} = req.body
    const postToComment = Posts.findById(post)
   
    if(!content || !author || !post){
       return  res.status(400).json({msg:"Please provide with all the fields"})
    }
    if(!postToComment){
        return res.status(404).json({msg:"the post does not exist"})
    }
    try{
        const newComment = await Comment.create({content, author, post})
        res.status(200).json(newComment)
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}

const updateComment = async (req,res) => {
   const  commentId = req.params.id
   const updatedComment = req.body
   if(!mongoose.Types.ObjectId.isValid(commentId)){
    return res.status(404).json({msg:'The comment Id does not exist'})
   } 
   try{
    const comment = await Comment.findByIdAndUpdate(commentId, updateComment , {new:true, runValidators:true})
    res.status(200).json(comment)
   }
   catch(error){
    res.status(500).json({msg:error.message})
   }
}

const deleteComment = async (req,res) => {
   const commentId = req.params.id
   if(!mongoose.Types.ObjectId.isValid(commentId)){
    return res.status(404).json({msg:'The comment Id does not exist'})
   } 
   try{
    const deletedComment = await Comment.findByIdAndDelete(commentId)
    res.status(200).json({message:`${deletedComment.author} comment was deleted `})
 
   }
   catch(error){
    res.status(500).json({msg:error.message})
   }
   
}
module.exports = {createComment, getAllComments, deleteComment, updateComment}