const express = require('express')
const router = express()
const {signUp, getUsers, deleteUser} = require('../controller/auth')

router.post('/signUp', signUp)
router.get('/users', getUsers)
router.delete('/users/:id', deleteUser)


module.exports = router

