const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const {Schema} = mongoose;
const {ObjectId} = mongoose.Schema;
const userSchema = new Schema({
    firstName:{
        type:String,
        require:true,
        length:32,
        trim:true
    },
    lastName:{
        type:String,
        length:32,
        trim:true
    },
    

},{
    timestamps:true
})


module.exports = mongoose.model("User", userSchema)