const blogsRouter = require('express').Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const tokenExtractor = require("../utils/middleware").tokenExtractor
const userExtractor = require("../utils/middleware").userExtractor

//middleware
//app.use(tokenExtractor)

blogsRouter.get('/' , async (req, res) => {
    const blogs = await Blog.find({}).populate('user' , {blogs : 0})
    res.json(blogs)
})

blogsRouter.get('/:id' , async(req , res) => {
    const blog = await Blog.findById(req.params.id)
    res.json(blog)
})

blogsRouter.post('/' , tokenExtractor , userExtractor , async (req, res) => {
    const body = req.body
    const user = req.user
    //const user = await User.findById(body.userId) //Without a token statement

    if(!body.likes)
        body.likes = undefined
    
    if(!body.title || !body.url)
        return res.status(400).end("You cannot omit title or url")

    const blog = new Blog({
        title : body.title,
        author : user.username,
        url : body.url,
        likes : body.likes,
        user : user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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

blogsRouter.delete("/:id" , tokenExtractor , userExtractor , async (req , res) => {
    const userId = req.userId

    //Validating whether its the creator of the blog or not
    if(req.decodedToken.id !== req.userId){
        return res.status(401).json({error : "unauthorized user"})
    }

    //Deleting the blog from the "blog list" of the creator
    let userToBeUpdated = await User.findById(userId)

    userToBeUpdated.blogs.forEach(blog => {
        if (blog.toString() === req.params.id){
            const res = userToBeUpdated.blogs.filter(item => item !== blog)
            userToBeUpdated.blogs = res
        }
    })

    await userToBeUpdated.save()

    //Deleting the blog itself
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end("Delete successful")

    /*Blog.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send("<h2>The blog has been deleted")
        })
        .catch(err => console.log(err))*/
})


module.exports = blogsRouter