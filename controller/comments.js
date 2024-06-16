const mongoose  = require('mongoose')
const Comment = require('../model/Commentmodel')
const Posts = require('../model/Postmodel')

const getAllComments = async (req, res) => {
    const { postId } = req.params;

    try {

        const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

        
        res.status(200).json(comments);
    } catch (error) {
        
        res.status(500).json({ error: 'Failed to fetch comments', message: error.message });
    }
}
const createComment = async (req,res) =>{
    const { content, author, postId } = req.body;

    if (!content ||!author ||!postId) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const post = postId
  
    try {
      const newComment = await Comment.create({ content, author, post });
      res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
      res.status(500).json({ error: { message: error.message } });
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