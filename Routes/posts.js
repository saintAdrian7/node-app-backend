const express = require('express')
const router = express.Router()
const {getAllPosts, getOnePost, addPost, updatePost, deletePost}= require('../controller/posts')
const auth = require('../middleware/auth')
const Post = require('../model/Postmodel')



router.get('/',getAllPosts)

router.get('/:id',getOnePost)

router.post('/', auth, addPost)

router.patch('/:id', updatePost)

router.delete('/:id', deletePost)

router.patch('/:postId/like', async (req, res) => {
    const { postId } = req.params;
  
    try {
     
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      
      post.likes += 1;
      
      
      await post.save();
  
      res.status(200).json(post); 
    } catch (error) {
      console.error('Error liking post:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  });

module.exports = router