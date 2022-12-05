import express, { Request, Response } from "express";

import { LoginObj } from "../interfaces/typings";

import loginUser from "../models/users/loginUser";
import { LoginSchema, option } from "../services/joiValidation";

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

      const logindetails: LoginObj  = { username, password};
      loginUser(logindetails, req, res);

  }
  catch(err){
    console.error(err);
  }
})

export default router;