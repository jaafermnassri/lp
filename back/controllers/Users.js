const User = require('../models/User')
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/isAuth");


 async function Register  (req,res) {
        const { email, password } = req.body;
        try {
            const existUser = await User.findOne({ email });
        if (existUser) {
          return res.status(400).send({ msg: "user already exists" });
        }
            const newUser = new User(req.body)
            const hashedPassword = await bcrypt.hash(password, 10);
            newUser.password = hashedPassword;
            
            await newUser.save()
            res.send({msg:"registred successfully", newUser})
        } catch (error) {
            res.status(400).send(error);
            console.log(error.message)
        }
    
}
async function Login  (req,res) {
  
    const { email, password } = req.body;
    try {
        const existUser = await User.findOne({email});
        if (!existUser){ return res.status(400).send({ msg: "You are not registered yet" });}
        const isMatched = await bcrypt.compare(password, existUser.password);
        if (!isMatched){ return res.status(400).send({ msg: "You are not registered yet,password" });}
        const payload = { id: existUser._id };
    const token = await jwt.sign(payload, "secret");
    res.send({ user: existUser, token });
    } catch (error) {
        res.status(400).send(error);
        console.log(error.message)
    }
}
 async function current (req,res) {
  res.send(req.user);
}

 async function getAllUsers  (req, res) {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  };
  async function getUser (req, res) {
    try {
      const user = await User.findOne({ id: req.user._id });
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  };
   async function  UpdateUser (req, res) {
    try {
        const updating = await User.updateOne({_id:req.params.idUpdate},{...req.body});
        const updated = await User.findOne({_id:req.params.idUpdate}) 
        res.send({msg:"updated successfully",updated})
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error); 
    }
  };
  async function deleteUser (req, res) {
    try {
      await User.deleteOne({ _id: req.user._id });
      res.send({ msg: "deleted successfully" });
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  };
  
  module.exports = { UpdateUser,current, deleteUser, getUser,Register,Login,getAllUsers };