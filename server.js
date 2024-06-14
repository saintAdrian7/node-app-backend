const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
require('dotenv').config()
const postsRoutes = require('./Routes/posts')
const authRoutes = require('./Routes/auth')


app.use(express.json())

/*connecting to the database */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB')
app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000')
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

