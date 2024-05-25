const express = require('express');
const Post = require('../models/Post')

const router = express.Router();

//   --- create  ---

router.post('/create',async(req,res)=>{
    try{
        const newPost = await Post.create(req.body);
        
        res
            .status(201)
            .send(newPost);
    }catch (err){
        res
            .status(500)
            .send({'message':err});
    }
})

// ---- get all

router.get('/',async(req,res)=>{
    try{
        const allPosts = await Post.find();
        res
            .status(201)
            .send(allPosts);
    }catch (err){
        res
            .status(500)
            .send({'message':err});
    }
})


// ----- get by id

router.get('/id/:_id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params._id);
        res
            .status(201)
            .send(post);
    }catch (err){
        res
            .status(500)
            .send({'message':err});
    }
})


//---- get by title

router.get('/title/:title',async(req,res)=>{
    try{
        const post = await Post.findOne({title:req.params.title})
        res
            .status(201)
            .send(post);
    }catch (err){
        res
            .status(500)
            .send({'message':err});
    }
})

//  -----   update

router.put('/id/:_id',async(req,res)=>{
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params._id,req.body,{new:true});
        res
            .status(201)
            .send(updatedPost);
    }catch (err){
        res
            .status(500)
            .send({'message':err});
    }
})

//----- delete

router.delete('/id/:_id',async(req,res)=>{
    try{
        const delPost = await Post.findByIdAndDelete(req.params._id);
        res
        .status(201)
        .send(delPost);
    }catch (err){
        res
            .status(500)
            .send({'message':err});
    }
})

//---- pagination

router.get('/postsWithPagination',async(req,res)=>{
    try{
        const page = req.body.page;
        const allPosts = await Post.find().skip(page * 10).limit(10);
        res
            .status(201)
            .send(allPosts);
    }catch (err){
        res
            .status(500)
            .send({'message':err});
    }
})


module.exports = router;