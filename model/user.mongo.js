const mongoose = require('mongoose')
const note = new mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type:String
    }
})
const userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    Notes:{
        type:[note]
    }
})
module.exports = mongoose.model('user',userSchema)