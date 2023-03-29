const blogsRouter = require('express').Router()
const Blog = require("../models/blog")

blogsRouter.get('/' , async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.get('/:id' , async(req , res) => {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
})

blogsRouter.post('/' , async (req, res) => {
    const body = req.body
    if(!body.likes)
        body.likes = undefined
    
    if(!body.title || !body.url)
        return res.status(400).end("You cannot omit title or url")

    const blog = new Blog(body)

    const savedBlog = await blog.save()
    res.status(200).json(savedBlog)
})

blogsRouter.put('/:id' , async (req , res) => {
    const body = req.body

    const blogBody = body

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id , blogBody , {new : true})
    res.status(200).json(updatedBlog)

    /*Blog.findByIdAndUpdate(req.params.id , blogBody , {new : true})
        .then(updateNote => {
            res.json(updateNote)
        })*/
})

blogsRouter.delete("/:id" , async (req , res) => {

    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()

    /*Blog.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send("<h2>The blog has been deleted")
        })
        .catch(err => console.log(err))*/
})


module.exports = blogsRouter