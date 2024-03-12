const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   phone:{
    type:Number,
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
    image:{
        type:Object,
        required:true,
        allowNull:true
    },
   
    createdAt:{
        type:Date,
        default:Date.now()
    }
 
});

const userModel=mongoose.model("userModel",userSchema);
module.exports=userModel;