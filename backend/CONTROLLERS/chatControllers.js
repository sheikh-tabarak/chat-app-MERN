const USER = require("../MODELS/user");
const CHAT = require("../MODELS/Chat");

const getChat=async(req,res,next)=>{
     
    const{author , to} = req.query;

    let chat;
    try

    {
          chat = await CHAT.find({ members : {$all : [author , to] } });
    }

    catch(err)
    {

        const error = new Error("SOMETHING WENT WRONG");
        console.log(err);
        error.code = 500;
        return next(error);
    }

    res.status(200).json({ chat : chat.map((item)=>item.toObject({getters:true})) });

};

const sendMessage=async(req, res , next)=>
{
    
    const{messageData} = req.body;

    const membersss = [messageData.from , messageData.to];

       const newMsg = new CHAT({
          author : messageData.from ,
          authorName : messageData.authorName ,
          to : messageData.to ,
          message : messageData.message ,
          time : messageData.time ,
          members : [...membersss]
       });

       try
       {
          await newMsg.save();
       }

       catch(err)
       {
   
           const error = new Error("SOMETHING WENT WRONG");
           console.log(err);
           error.code = 500;
           return next(error);
       }

       res.status(201).json({message : "MESSAGE SENT SUCCESSFULLY"});

};

exports.sendMessage = sendMessage;
exports.getChat = getChat;