const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*defining the structure of the schema */
const PostsSchema = new Schema({
    title: {
        type:String,
        required:true
    },

    content: {
        type:String,
        required: true
    },
    author: {
       type:Schema.Types.ObjectId,
       ref:'User',
       required: true
       
    },
    comments: [{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['published', 'draft', 'archived'],
        default: 'draft',
      },
},{timestamps:true})


module.exports = mongoose.model('Posts', PostsSchema)