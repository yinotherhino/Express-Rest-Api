import express from 'express';
import {config} from 'dotenv'

config();
const HOST: string = process.env.API_URL!;
const router = express.Router();




router.get('/', (req, res ) => {
    try{
      res.clearCookie("token");
      res.status(200).redirect('/');
  }catch(err){
    console.error(err)
    res.status(500).json({Error:"Error signing out"})
  }
  });

export default router;