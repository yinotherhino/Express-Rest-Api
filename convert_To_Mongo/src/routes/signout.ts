import express from 'express';
import axios from 'axios';
import {JwtPayload} from 'jsonwebtoken'

import reqErrorHandler from '../services/reqErrorHandler';
import validateCookie from '../services/validateCookie';
import reqbodycheck from '../services/reqbodycheck';
import { authToken } from '../middleware/authToken';

const router = express.Router();
const HOST: string = 'http://127.0.0.1:5000';



router.get('/', (req, res ) => {
    try{
      const loggedIn = false;
      res.clearCookie("token");
      res.status(200).redirect('/');
  }catch(err){
    console.error(err)
  }
  });

export default router;