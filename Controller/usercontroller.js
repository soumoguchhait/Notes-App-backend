const userModel = require("../Models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
 require("dotenv").config();
saltRounds = 10;
const SECRET_KEY= process.env.Secret_key;

const createUser = async (req, res) => {
  const user = req.body;
  const file = req.file;

  let newUser = new userModel(user);

  try {
    const emailExist = await userModel.findOne({
      email: user.email,
    });

    if (emailExist) {
      return res.status(400).json({
        message: "Email already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    newUser.password = hashPassword;

    if (file) {
      // newUser.image = file.path;
      // console.log(newUser, "this is the newUser object");
      newUser.image = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      // localStorage.setItem('imageUrl', newUser.image);
    }

    await newUser.save();

    return res.status(201).json({
      message: "User Created successfully",
      result: newUser,
    });
  
  } catch (err) {
    if (file) {
      console.log(err, "this is the error");
    }

    res.status(500).json({
      message: err.message,
    });
  }
  console.log(newUser)
};
const getUsers = async (req, res) => {
  try {
    const user = await userModel.find({});
    return res.status(201).json({
      message: "Users fetched successfully",
      result: user,
      count: user.length,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const editUser = async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  try {
    const findOneAndUpdate = await userModel.findOne({
      _id: id,
    });
    if (!findOneAndUpdate) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if(updatedUser.password!=""){
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(updatedUser.password, salt);
      updatedUser.password = hashPassword;
    }
    const test = await userModel.findByIdAndUpdate(id, updatedUser);
    return res.status(201).json({
      message: "User Updated successfully",
      result: test,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const findOneAndDelete = await userModel.findOne({
      _id: id,
    });
    if (!findOneAndDelete) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const test = await userModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "user deleted successfully",
      result: test,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    try {
      
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
  
      const token = jwt.sign({ email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
       
      });
  
      return res.status(200).json({
        message: "Login successfullyy",
        token,
        user:user
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };

module.exports = {
  createUser,
  getUsers,
  editUser,
  deleteUser,
  userLogin,
};
