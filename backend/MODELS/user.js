const mongoose = require("mongoose");

const SCHEMA = mongoose.Schema;

const userSchema = new SCHEMA({
    username : {type : String , required : true} ,
    email : {type : String , required : true} ,
    password : {type : String , required : true} , 
     messages : [{type : mongoose.Types.ObjectId , ref : "message" }] 
});

module.exports =  mongoose.model("user" , userSchema);