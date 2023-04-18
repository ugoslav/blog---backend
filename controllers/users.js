const bcrypt = require("bcrypt")
const User = require("../models/user")
const userRouter = require("express").Router()

userRouter.get('/' , async(req , res) => {
    const users = await User.find({}).populate("blogs" , {likes : 0 , user : 0 , url : 0})
    res.json(users)
})

userRouter.get('/:id' , async(req , res) => {
    const target = await User.findById(req.params.id).populate("blogs")
    res.json(target)
})
userRouter.post('/' , async(req , res) => {
    const {username , name , password} = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password , saltRounds)

    const user = new User({
        name : name,
        username : username,
        passwordHash : passwordHash
    })

    const savedUser = await user.save()

    res.status(200).json(savedUser)
})

userRouter.delete('/:id' , async(req , res) => {
    await User.findByIdAndRemove(req.params.id)
    res.status(200).end("Deleted")
})

module.exports = userRouter