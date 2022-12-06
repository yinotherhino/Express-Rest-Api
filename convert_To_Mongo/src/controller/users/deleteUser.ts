import {JwtPayload} from 'jsonwebtoken';
import { Request, Response, urlencoded } from 'express';

import usersModel from '../../models/usersSchema';

const deleteUser = async ( idEmail: string, req:JwtPayload, res:Response )=>{
  try{
    const userEmail = req.user.email;
    const user = await usersModel.findOne({email:userEmail});

    if(user && user.isAdmin === true){
      const deletedUser = await usersModel.deleteOne({email:idEmail})
      if(!deletedUser){
        return res.status(400).json({Error:"User not found"})
      }
      return res.status(204).end();
    }

  return res.status(403).json({Error:"Access denied."})

}catch(err){
  return res.status(404).json({Error:"Server Error."})
}
}

export default deleteUser;