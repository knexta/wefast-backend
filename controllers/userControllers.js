import  User  from "../models/userSchema.js";
import { ObjectId}  from "mongodb";

//Get allUser
export const getAllUser = async (req, res) => {
    let users = await User.find({});
    res.status(200).send(users);
  };

//Update User
 export const updateUser = async (req,res)=>{
if(!req.params.id){
  res.status(400).send({message:"User Id is mandatory...."});}
    try {
        console.log(req.params.id);
        const updatedUser = await User.findOneAndUpdate(
          { _id: ObjectId(req.params.id) },
          { $set: req.body },
          { ReturnDocument: "after" }
        );
        console.log(updatedUser);
  
        res.status(200).send(updatedUser);
      } catch (err) {
        res.status(500).send(err.message);
      }
  };

//get user by id
 export const getUserById = async (req,res)=>{

  

    try {
        const user = await User.findOne({
          _id: ObjectId(req.params.id),
        });
        console.log(req.params.id);
        console.log(user);
        //user details
        res.status(200).send(user);
      } catch (err) {
        res.status(500).send(err.message);
      }
  };
  

  //Delete user by id

  export const deleteUserById = async (req,res) =>{
    try {
        await User.deleteOne({ _id: ObjectId(req.params.id) });
  
        res.status(200).send("user deleted");
      } catch (err) {
        res.status(500).send(err.message);
      }

  };


