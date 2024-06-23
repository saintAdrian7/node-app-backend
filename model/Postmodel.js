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
      
       
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    status: {
        type: String,
        enum: ['published', 'draft', 'archived'],
        default: 'draft',
      },
      image: { type: String }
},{timestamps:true})


module.exports = mongoose.model('Posts', PostsSchema)