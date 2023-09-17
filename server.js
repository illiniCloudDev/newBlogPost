const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// middleware with the express application 
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to daddy MondgoDB!!'))
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

//get all posts
app.get('/posts', async (req, res) =>{
    const posts = await Post.find()
    res.send(posts)
})

//get one post
app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.send(post)
})

//create new post
app.post('/posts', async (req, res) => {
    const newPost = new Post(req.body)
    const savedPost = await newPost.save()
    res.send(savedPost)
})

//delete post
app.delete('/posts/:id', async (req, res) =>{
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).send('Post exterminated')
})

app.listen(5500, () => console.log('Server is looking good on port 5500'))