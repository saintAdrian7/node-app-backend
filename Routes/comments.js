const express = require('express')

const router = express.Router()

const{createComment, getAllComments, deleteComment, updateComment} = require('../controller/comments')


router.get('/', getAllComments)

router.post('/', createComment)

router.patch('/:id', updateComment)

router.delete('/:id', deleteComment)


module.exports = router