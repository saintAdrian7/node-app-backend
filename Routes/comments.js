const express = require('express')
const router = express.Router()
const Comments = require('../model/Commentmodel')


const{createComment, getAllComments, deleteComment, updateComment} = require('../controller/comments')



router.get('/:postId/', getAllComments)

router.post('/', createComment)

router.patch('/:id', updateComment)

router.delete('/:id', deleteComment)


module.exports = router