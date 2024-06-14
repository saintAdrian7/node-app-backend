const  mongoose  = require("mongoose")
const User = require('../model/Usermodel')


const signUp =  async (req,res) => {
    const {username, email, password} = req.body
    try{
        const newUser = await User.create({username, email, password})
        res.status(200).json(newUser)
    
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

 module.exports = {signUp, getUsers, deleteUser}