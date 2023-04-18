const User = require("../models/user")
const jwt = require("jsonwebtoken")

const errorHandler = (error , req , res , next) => {
    console.error(error.message)

    if(error.name === "ValidationError"){
        return res.status(400).json({error : error.message})
    }
    else if(error.name === "JsonWebTokenError") {
        return res.status(400).json( {error : "invalid token"})
    }
    else if(error.name === "TokenExpiredError") {
        return res.status(400).json ({
            error : "token expired"
        })
    }

    next(error)
}

const tokenExtractor = (req , res , next) => {
    const authorization = req.get("authorization")
    if(authorization && authorization.startsWith("Bearer ")){
        req.token = authorization.replace('Bearer ' , '')
    }
    
    next()
    
}

const userExtractor = async (req , res , next) => {
    const decodedToken = jwt.verify(req.token , process.env.SECRET)

    if(!decodedToken.id){
        return res.status(400).json({ error : "invalid token"})
    }

    const user = await User.findOne({username : decodedToken.username})
    const userId = user._id.toString()
    req.user = user
    req.userId = userId
    req.decodedToken = decodedToken
    next()
}

//Middlewares for practice
const middlewareOne = (req , res , next) => {
    const variableOne = req.get("cat")
    req.cat = variableOne
    next()
}

const middlewareTwo = (req , res , next) => {
    const variableTwo = req.get("cat")
    console.log(`This is the second middleware and the value from the first middleware is ${variableTwo}`)
    next()
}

const middlewareThree = (req, res , next) => {
    console.log("The last riiide!!!")
    next()
}

module.exports = { errorHandler , tokenExtractor , userExtractor}