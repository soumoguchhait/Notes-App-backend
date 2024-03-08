const express=require("express");
const bodyparser=require("body-parser");
const {createUser} = require("../Controller/usercontroller");
const {userLogin}=require("../Controller/usercontroller")
const {getUsers}=require("../Controller/usercontroller")
const{editUser}=require("../Controller/usercontroller")
const{deleteUser}=require("../Controller/usercontroller")
const{checkAuth}=require("../middleware/authentication")
const{isAdmin}=require("../middleware/authentication")
const router=express.Router();
router.post("/create-user",createUser);
router.get("/get-users",isAdmin,getUsers);
router.patch("/edit-user/:id",checkAuth,editUser);
router.delete("/delete-user/:id",deleteUser);
router.post("/Login-user",userLogin);
module.exports=router;