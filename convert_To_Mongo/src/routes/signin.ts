import express from 'express';
import axios from 'axios';
import {JwtPayload} from 'jsonwebtoken'

import reqErrorHandler from '../services/reqErrorHandler';
import validateCookie from '../services/validateCookie';
import reqbodycheck from '../services/reqbodycheck';
import { authToken } from '../middleware/authToken';

const router = express.Router();
const HOST: string = 'http://127.0.0.1:5000';

router.post('/', async(req, res ) => {
    try{
    let {username, password} = req.body
  
    axios.post(`${HOST}/login`, {username: username.toLowerCase(), password}, {withCredentials: true})
    .then( apiRes => {
        console.log(apiRes.data)
        if(apiRes.status===201){

        res.cookie('token', apiRes.data.token);

        return res.status(apiRes.status).redirect('/');
        }
        else{
          return res.status(apiRes.status).render('signin', { title: 'Login: Netflix', error: apiRes.data})
        }
    })
    .catch((err:any)=>{
      return res.status(401).render('signin', { title: 'Login: Netflix', Link1: '', Link2:'' , error: 'User does not exist. Check your credentials.'});
    })
  
    }
    catch(err){
      res.status(401).render('signin', { title: 'Login: Netflix', Link1: '', Link2:'' , error: 'User does not exist. Check your credentials.'});
    }
  });


router.get('/', (req, res ) => {
    try{
        return res.status(200).render('signin', { title: 'Login: Netflix', Link1: '', Link2:'' ,loggedIn:false });
      }
      catch(err){
        console.error(err)
        res.status(200).render('signin', { title: 'Login: Netflix', Link1: '', Link2:'' ,loggedIn:false });
      }
    })

    export default router;