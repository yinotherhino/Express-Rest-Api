import express from 'express';
import axios from 'axios';
import {JwtPayload} from 'jsonwebtoken'

import reqErrorHandler from '../services/reqErrorHandler';
import validateCookie from '../services/validateCookie';
import reqbodycheck from '../services/reqbodycheck';
import { authToken } from '../middleware/authToken';

const router = express.Router();
const HOST: string = 'http://127.0.0.1:5000';
// for heroku
// const HOST: string = String(process.env.HOST);

/* GET home page. */
// let loggedIn = false

// router.all('*', async (req:JwtPayload, res, next) => {
//   let { isValid, user } = await  validateCookie(req.signedCookies.token)
//   loggedIn = isValid;
//   req.user = user;
//   next()
// })

router.get('/', async(req, res ) => {
  try{
    // if(!loggedIn) return res.status(200).redirect('/signin')
    const config = {
      headers:{
          Authorization:`Bearer ${req.cookies.token}`
      }
    }
    axios.get(`${HOST}/movies`, config)
    .then( async(apiRes) => {
      let result= apiRes.data.result;
       let {isValid, isAdmin} = await  validateCookie(req.cookies.token)
      res.status(200).render('index', { title: 'Netflix', Link1: 'Signin', Link2:'/Signup', result: result, loggedIn:isValid, homelink:"#", isAdmin, username:req.signedCookies.username });
    })
    .catch((err)=>{
      console.error(err);
    })
  }
  catch(err){
    console.error(err)
  }
});



router.post('/signup', async(req, res ) => {
  try{
  reqErrorHandler(req, res)
  let {username, password, email, fullname} = req.body

  axios.post(`${HOST}/users`, {username: username.toLowerCase(), password, email: email.toLowerCase(), fullname:fullname.toLowerCase()}, {withCredentials: true})
  .then( apiRes => {
    if(apiRes.data === 'user Added successfully' && apiRes.status===201)
      res.cookie('username', username.toLowerCase(), {signed: true})
      if(req.signedCookies.isAdmin === true) return res.status(201).redirect('/')
      return res.status(apiRes.status).redirect('/');
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

router.post('/adminsignup', async(req, res ) => {
  try{
    if(req.signedCookies.isAdmin === 'false' || !req.signedCookies.isAdmin) res.status(403).redirect('/')
  let {username, password, email, fullname} = req.body

  axios.post(`${HOST}/users`, {username: username.toLowerCase(), password, email: email.toLowerCase(), fullname:fullname.toLowerCase()}, {withCredentials: true})
  .then( apiRes => {
    if(apiRes.data === 'user Added successfully' && apiRes.status===201)
      return res.status(201).redirect('/');
    }
  )
  .catch((err:any)=>{
    console.error(err.data )
    return res.status(401).render('signin', { title: 'Login: Netflix', Link1: '', Link2:'' , signupError: 'An error Ocurred.'});
  })

  }
  catch(err){
    console.error(err)
    res.status(401).render('signin', { title: 'Login: Netflix', Link1: '', Link2:'' , signupError: 'User already exist. Check your credentials.'});
  }
});




router.get('/signout', (req, res ) => {
  try{
    const loggedIn = false;
    res.clearCookie("token");
    res.status(200).redirect('/');
}catch(err){
  console.error(err)
}
});

router.get('/cpanel', authToken, async (req, res ) => {
  // if(!loggedIn){
  //   return res.status(400).redirect('/');
  // }
  const status = req.query.deletemovieerr
  if(!req.signedCookies.isAdmin || req.signedCookies.isAdmin === 'false'){
    return res.redirect('/')
  }
  const {isValid, isAdmin} = await validateCookie(req.signedCookies.username)
  if(isValid && isAdmin){
    console.log(req.signedCookies)
    return res.status(200).render('dashboard', { title: `Admin Dashboard: Netflix`, Link1: 'Signout ', Link2:'', status, loggedIn:true  });
  }
  res.status(403).redirect('/signin')

});

router.get('/dashboard', authToken,(req:JwtPayload, res ) => {
  const loggedIn= true;
  // if(!loggedIn){
  //   return res.status(400).redirect('/');
  // }
  const status = req.query.deletemovieerr
  if(req.user.isAdmin === 'true'){
    return res.redirect(`/cpanel?deletemovieerr=${status}`)
  }
  res.status(200).render('userdashboard', { title: `User Dashboard: Netflix`, Link1: 'Signout ', Username:req.signedCookies.username, status, loggedIn });
});

router.get('/getallusers', authToken,(req, res ) => {
  // if(!loggedIn){
  //   return res.status(400).redirect('/');
  // }
  axios.get(`${HOST}/users`, {withCredentials: true})
    .then( async(apiRes) => {
      let result= apiRes.data;
      let {isValid, user} = await validateCookie(req.signedCookies.token)
      res.status(200).render('getall', { title: `All Users : Netflix`, Link1: 'Logout ', Link2:'' , result, loggedIn:isValid});
    })
    .catch((err)=>{
      console.error(err)
    })
    reqErrorHandler(req, res);
});

router.get('/getallmovies', authToken,(req, res ) => {
  // if(!loggedIn){
  //   return res.status(400).redirect('/');
  // }
  const headers = {
    Cookie: `token=${req.signedCookies.token}`
  }
  axios.get(`${HOST}/movies`, {withCredentials: true, headers: headers})
    .then( async (apiRes) => {
      let result= apiRes.data.result;
      let {isValid} = await validateCookie(req.signedCookies.username)
      res.status(200).render('getall', { title: `All Users : Netflix`, Link1: 'Logout ', Link2:'' , result, loggedIn:isValid});
    })
    .catch((err)=>{
      // console.error(err)
    })
});

router.post('/deletemovie', authToken,(req, res)=> {
  // if(!loggedIn){
  //   return res.status(400).redirect('/');
  // }
  const headers = {
    Cookie: `isAdmin=${req.signedCookies.isAdmin}; username=${req.signedCookies.username}`
  }
  axios.delete(`${HOST}/movies/${req.body.id}`, {withCredentials: true, headers: headers})
  .then(apiRes =>{
    res.redirect(`/dashboard?status=${apiRes.data}`)
  })
  .catch(err =>{
    // res.redirect(`/dashboard?status=${err.data}`)
    res.send(err.data)
    console.error(err.data)
  })
})

router.post('/deleteuser', authToken,(req, res)=> {
  // if(!loggedIn){
  //   return res.status(400).redirect('/');
  // }
  try{const headers = {
    Cookie: `isAdmin=${req.signedCookies.isAdmin}; username=${req.signedCookies.username}`
  }
  let idEmail = req.body.id || req.signedCookies.username
  axios.delete(`${HOST}/users/${idEmail}`, {withCredentials: true, headers: headers})
  .then(apiRes =>{
    res.status(apiRes.status).redirect('/dashboard')
  })
  .catch(err =>{
    console.error(err)
    res.status(403).send(err.data)
  })}
  catch(err){
    // console.error(err)
    res.send("Error")
  }
});

router.post('/updateuser',authToken, (req, res)=> {
  //   if(!loggedIn){
  //   return res.status(400).redirect('/');
  // }
  const headers = {
    Cookie: `isAdmin=${req.signedCookies.isAdmin}; username=${req.signedCookies.username}`
  }
  req.body = reqbodycheck(req.body);
  const {email, username, id, password, fullname} = req.body;
  if(id){
    axios.put(`${HOST}/users/${id}`, {email, password, fullname, username}, {withCredentials: true, headers:headers})
    .then(apiRes =>{
      res.status(apiRes.status).redirect('/dashboard')
    })
    .catch(err =>{
      res.status(403).send(err.data)
    })
  }
  else{
    axios.put(`${HOST}/users`, {email, password, fullname, username}, {withCredentials: true, headers:headers})
    .then(apiRes =>{
      res.redirect('/dashboard')
    })
    .catch(err =>{
      // console.error(err)
      res.send(err.data)
    })
  }
});

router.post('/updatemovies', authToken,(req, res)=> {
  // if(!loggedIn){
  //   return res.status(400).redirect('/');
  // }
  const headers = {
    Cookie: `isAdmin=${req.signedCookies.isAdmin}; username=${req.signedCookies.username}`
  }
  req.body = reqbodycheck(req.body);
  const {title, description, id, image, price} = req.body;
  axios.put(`${HOST}/movies`, {title, description, image, price, id:0}, {withCredentials: true, headers:headers})
  .then(apiRes =>{
    res.redirect('/dashboard')
  })
  .catch(err =>{
    // console.error(err)
    res.send(err.data)
  })
});

export default router;
