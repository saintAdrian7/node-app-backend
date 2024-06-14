const express = require('express')
const router = express.Router()
const {getAllPosts, getOnePost, addPost, updatePost, deletePost}= require('../controller/posts')
const commentRoutes = require('./comments')


router.use('/comments', commentRoutes )

router.get('/',getAllPosts)

router.get('/:id',getOnePost)

router.post('/', addPost)

router.patch('/:id', updatePost)

router.delete('/:id', deletePost)



module.exports = router