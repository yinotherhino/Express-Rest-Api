import express, { Request, Response } from "express";

import { LoginObj } from "../interfaces/typings";

import { generateSignature, LoginSchema, option, validatePassword } from "../services/joiValidation";
import usersModel from "../models/usersSchema";

const router = express.Router();

router.post('/', async(req:Request, res:Response)=>{
    try{
      let { username, password } = req.body
      const validateResult = LoginSchema.validate(req.body, option)
      if(validateResult.error){
        return res.status(400).json({
          Error: validateResult.error.details[0].message,
        });
      }

      const User = await usersModel.findOne({username})

      if(User){
          const isCorrectPassword = await validatePassword(password, User.password, User.salt);
          if(isCorrectPassword){
              const token = await generateSignature({username, isAdmin:User.isAdmin})
              return res.status(201).json({message:'Login successful', isAdmin: User.isAdmin || false, token});
          }
      }
      return res.status(401).json({Error:"Username or password Incorrect"})

  }
  catch(err){
    return res.status(500).json({Error:"Server error"})
  }
})

export default router;