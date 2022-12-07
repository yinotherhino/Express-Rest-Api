import {JwtPayload} from 'jsonwebtoken';
import {  Response } from 'express';

import { UserObj } from '../../interfaces/typings';
import usersModel from '../../models/usersSchema';
import reqBodyCheck from '../../services/reqbodycheck';


const updateUser = async( req:JwtPayload, res:Response )=>{

  try{
    // const id= Number(req.params.id)
    req.body = reqBodyCheck(req.body)
    const email = req.user.email;
    let { username, password, fullname, userEmail } = req.body
    if( email || password || username || fullname ){
    const user = await usersModel.findOne({username});
    if(!user){
      return res.status(403).json({Error: "Access denied"})
    }
    const putData :UserObj = { username, password, email:userEmail, fullname, id: user.id }

    if(user.isAdmin === true){
      const updatedUser = await usersModel.updateOne({email:putData.email}, putData)
      if(!updatedUser){
        return res.status(400).json({Error:"User not found"})
      }
      return res.status(200).json({data:updateUser, message:"User updated successfully"});
    }
    else{
      usersModel.findOne({username})
      if(username === putData.username){
        const updatedUser = await usersModel.updateOne({email:putData.email}, putData)
        if(updatedUser){
          return res.status(200).json({data:updateUser, message:"User updated successfully"});
        }
      }
    }}


  return res.status(403).json({Error:"Access denied."})

}catch(err){
  return res.status(404).json({Error:"Server Error."})
}
  
}

export default updateUser;