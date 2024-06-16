const mongoose = require('mongoose');
const Posts = require('../model/Postmodel');
const User = require('../model/Usermodel');

/* Getting all posts */
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.find({}).sort({ createdAt: -1 }).populate('author', 'username image');
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ msg: `server error: ${error}` });
  }
};

/* Function to return one post */
const getOnePost = async (req, res) => {
  const postId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ msg: 'The Id of user does not exist' });
  }
  try {
    const post = await Posts.findById(postId);
    if (!post) {
      res.status(400).json({ msg: 'There is no such Post' });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const addPost = async (req, res) => {
  const { title, content, } = req.body;
  const author = req.user?.userId; 

  console.log('Author:', author); 

  try {
    const newPost = await Posts.create({ title, content, author });
    res.status(200).json({msg:"Posted successfulyy"});
  } catch (error) {
    res.status(500).json({msg:"server error"});
  }
};

/* Updating a post */
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ msg: 'The post Id is invalid' });
  }

  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(400).json({ msg: 'No such post' });
    }

   
    if (post.author.toString() !== req.user._id) {
      return res.status(403).json({ msg: 'You do not have permission to edit this post' });
    }

    post.title = title;
    post.content = content;
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/* Deleting a post */
const deletePost = async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ msg: 'The post id is invalid' });
  }

  try {
    const post = await Posts.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

   
   
    res.status(200).json({ msg: `Post was deleted successfully` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllPosts,
  getOnePost,
  addPost,
  updatePost,
  deletePost
};
