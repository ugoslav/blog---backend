const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    name : String,
    username : {
        type : String,
        required : true,
        minlength : 3,
        unique : true
    },
    passwordHash : {
        type : String,
        required : true,
        minlength : 3
    },
    blogs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'blog'
        }
    ],
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON' , {
    transform : (document , returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('user' , userSchema)