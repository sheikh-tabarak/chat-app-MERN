const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({

      message : {type : String , required : true} ,
      author : {type : mongoose.Types.ObjectId ,  ref : "user" , required : true } , 
      authorName : {type : String , required : true} , 
      to : {type : mongoose.Types.ObjectId ,  ref : "user" , required : true} , 
      members : {type : Array , required : true} ,
      time  : {type : String , required : true} ,  
    
    });

    module.exports = mongoose.model("message" , chatSchema) ;