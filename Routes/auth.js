const express = require('express')
const router = express()
const {signUp, getUsers, deleteUser, login} = require('../controller/auth')

router.post('/signUp', signUp)
router.post('/login', login)
router.get('/', getUsers)
router.delete('/:id', deleteUser)


module.exports = router

