const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// middleware with the express application 
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected you are my boy'))
    .catch(error => console.log(error.message))

const postSchema = new mongoose.Schema({
    title: String,
    authors: String,
    image: String,
    content: String,
})

const Post = mongoose.model('Post', postSchema)

//get all posts
//get one post
//create new post
//delete post

app.get('/posts', async (req, res) =>{
    const posts= await Post.find()
    res.send(posts)
})

app.get('/posts/:id', async (req, res) =>{
    const posts= await Post.findById()
    res.send(posts)
})

