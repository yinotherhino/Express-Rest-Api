import express from 'express';
import axios from 'axios';

const router = express.Router();
const HOST: string = 'http://127.0.0.1:5000';


router.post('/', async(req, res ) => {
    try{
    let {username, password, email, fullname} = req.body

    axios.post(`${HOST}/users`, {username: username.toLowerCase(), password, email: email.toLowerCase(), fullname:fullname.toLowerCase()})
    .then( apiRes => {
        
      if(apiRes.status===201){
        return res.status(201).redirect('/signin');
      }
    else{
        console.log(apiRes.status)
        return res.status(apiRes.status).redirect('/signin');
    }
      }
     
    )
    .catch((err:any)=>{
      console.error(err)
      return res.status(401).render('signin', { title: 'Login: Netflix', Link1: '', Link2:'' , signupError: err});
    })
  
    }
    catch(err){
      console.error(err)
      res.status(401).render('signin', { title: 'Login: Netflix', Link1: '', Link2:'' , signupError: 'User already exist. Check your credentials.'});
    }
});

export default router;