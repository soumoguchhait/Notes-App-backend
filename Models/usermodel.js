const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        required:true,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const userModel=mongoose.model("userModel",userSchema);
module.exports=userModel;