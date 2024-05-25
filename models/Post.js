const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : {
        type:String, 
        required: [true, 'Title is required'],
        unique:true
    },
    body : {
        type:String, 
        required: [true, 'Body is required'],
    }
},{timestamps:true})

const Post = mongoose.model('post', postSchema);

module.exports = Post;