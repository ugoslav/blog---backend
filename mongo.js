const mongoose = require("mongoose")
const { MONGODB_URL } = require("./utils/config")
const Blog = require("./models/blog")

const url = MONGODB_URL

mongoose.set('strictQuery' , false)

const title = process.argv[2]

const author = process.argv[3]

const blogUrl = process.argv[4]

const likes = process.argv[5]

mongoose.connect(url)

const newBlog = new Blog({
    title : title,
    author : author,
    url : blogUrl,
    likes : likes
})

newBlog.save().then(() => {
    console.log("The blog has been saved!!")
    mongoose.connection.close()
})