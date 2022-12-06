import {JwtPayload} from 'jsonwebtoken';
import {  Response } from 'express';

import { UserObj } from '../../interfaces/typings';
import usersModel from '../../models/usersSchema';


const updateUser = async( putData: UserObj, req:JwtPayload, res:Response )=>{

  try{
    const userEmail = req.user.email;
    const user = await usersModel.findOne({email:userEmail});

    if(user && user.isAdmin === true){
      const updatedUser = await usersModel.updateOne({email:putData.email}, putData)
      if(!updatedUser){
        return res.status(400).json({Error:"User not found"})
      }
      return res.status(204).json(updateUser);
    }
    else{
      usersModel.findOne({email:userEmail})
      if(userEmail === putData.email){
        const updatedUser = await usersModel.updateOne({email:putData.email}, putData)
        if(updatedUser){
          return res.status(204).json(updateUser);
        }
      }
    }

  return res.status(403).json({Error:"Access denied."})

}catch(err){
  return res.status(404).json({Error:"Server Error."})
}
  
}

export default updateUser;