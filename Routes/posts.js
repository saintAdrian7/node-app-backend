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
    const {userId} = req.body
  
    try {
     
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      
      if(post.likedBy.includes(userId)){
        return res.status(400).json({msg:'User already liked the post'})
      }
     
      post.likedBy.push(userId)
      post.likes += 1;
      await post.save();
      res.status(200).json(post); 
    } catch (error) {
      console.error('Error liking post:', error);
      res.status(500).json({ msg: 'Server error' });
    }
  });


  router.patch('/:postId/unlike', async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
    
    try {
      const post = await Post.findById(postId); 
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      
      if (post.likedBy && post.likedBy.includes(userId)) {
        post.likedBy = post.likedBy.filter(id => id!= userId);
        post.likes = Math.max(0, post.likes - 1); 
      }
    
      await post.save();
      res.status(200).json({ likes: post.likes });
    
    } catch (err) {
      console.error('Error unliking post:', err);
      res.status(500).json({ error: 'Failed to unlike post' });
    }
  });

module.exports = router