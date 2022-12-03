import express, { Request, Response } from "express";

import { LoginObj } from "../interfaces/typings";

import loginUser from "../models/users/loginUser";
import initDb from "../services/initDb.services";
import reqErrorHandler from "../services/reqErrorHandler";

const router = express.Router();
const databasePath = './db/usersDb.json';

router.post('/', async(req:Request, res:Response)=>{
    try{
        initDb(databasePath);
      let { username, password} = req.body;
      if( (username && password) || req.signedCookies.username ){
        // password = await bcrypt.hash(password, 10) 
        const logindetails: LoginObj  = { username, password};
        loginUser(logindetails, req, res);
      }
      else{
        res.status(404).send("Bad Request, you need to send the (password and username) login details.");
      }
      reqErrorHandler(req, res);
  }
  catch(err){
    console.error(err);
  }
  })

  export default router;