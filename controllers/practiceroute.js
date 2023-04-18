const express = require("express")
const app = express()
const practiceRouter = require("express").Router()
const middlewareOne = require("../utils/middleware").middlewareOne
const middlewareTwo = require("../utils/middleware").middlewareTwo
const middlewareThree = require("../utils/middleware").middlewareThree


practiceRouter.post("/" , middlewareOne, middlewareTwo , (req , res) => {
    console.log("Hi there")
    res.status(200).end()
})

module.exports = practiceRouter