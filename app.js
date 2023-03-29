require("dotenv").config()
require("express-async-errors")
const config = require("./utils/config")
const express = require("express");
const app = express()
const cors = require("cors");
const blogsRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")
const { info, error } = require("./utils/logger")

//Connection to MongoDB
const mongoose = require("mongoose")

mongoose.set('strictQuery' , false)

info(`Connecting to ${config.MONGODB_URL}`)


mongoose.connect(config.MONGODB_URL)
    .then(() => {
        info("Connected to MongoDB")
    })
    .catch(err => {
        error(`Error connecting to MongoDB, bujhle? : ${err.message}`)
    })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use("/api/blogs",blogsRouter)

app.get("/",  (req , res) => {
    res.end("Hello world")
})

module.exports = app