
const express = require('express')
const  mongoose  = require("mongoose")
const User = require('../model/Usermodel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signUp =  async (req,res) => {
    const {username, email, password} = req.body
    try{
        const newUser = await User.create({username, email, password})
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET, 
            { expiresIn: '1000h' } 
          );
        res.status(201).json({ token, userId: newUser._id });
    
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
 }
const login = async (req,res) => {
    try{
        const{email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
           return res.status(400).json({msg:'The user does not exist,invalid credintials'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({msg:'Wrong password.Try again!'})
        }

    const token = jwt.sign({ userId: user._id },  process.env.JWT_SECRET, { expiresIn: '1000h' });
    res.status(201).json({ token, userId: user._id });
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
    


}

 const getUsers = async (req,res) => {
    try{
        const allUsers = await User.find({}).sort({createdAt: -1})
        res.status(200).json(allUsers)
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
 }

 
const deleteUser = async (req,res) => {
    const userId = req.params.id
    if(!mongoose.Types.ObjectId.isValid(userId)){
     return res.status(404).json({msg:'The user Id does not exist'})
    } 
    try{
     const deletedUser = await User.findByIdAndDelete(userId)
     res.status(200).json({message:`${deletedUser.username}  was deleted `})
  
    }
    catch(error){
     res.status(500).json({msg:error.message})
    }
    
 }

 module.exports = {signUp, getUsers, deleteUser, login}