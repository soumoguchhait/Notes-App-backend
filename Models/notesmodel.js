const mongoose=require("mongoose");
const notesSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    info:{
        type:String,
        required:true
    },
   
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const notesModel=mongoose.model("notesModel",notesSchema);
module.exports=notesModel;