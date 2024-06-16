const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
require('dotenv').config()
const cors = require('cors');
const path = require('path');
const postsRoutes = require('./Routes/posts')
const authRoutes = require('./Routes/auth')
const commentRoutes = require('./Routes/comments')

app.use(cors({ origin: 'https://node-app-frontend.onrender.com' }));
app.use(express.json())

app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(express.urlencoded({ extended: true }))

/*connecting to the database */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB')
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
})
.catch((error) => {
    console.log('unable to connect to MongoDB')
    console.error(error)
})

/* setting up middleware */


app.use((req, res, next) => {
    console.log(req.url, req.method)
    next()
})

app.use('/api/auth', authRoutes)

app.use('/api/posts', postsRoutes) 

app.use('/api/comments', commentRoutes)


