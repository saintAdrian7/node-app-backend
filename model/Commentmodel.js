const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content:{
        type:String,
        required: true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:'User',
        
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
      required: true
    }
},{timestamps:true})


module.exports = mongoose.model('Comment', CommentSchema)