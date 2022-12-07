import express from 'express';
import axios from 'axios';
import {JwtPayload} from 'jsonwebtoken'

import reqErrorHandler from '../services/reqErrorHandler';
import validateCookie from '../services/validateCookie';
import reqbodycheck from '../services/reqbodycheck';
import { authToken, frontendAuthToken  } from '../middleware/authToken';

const router = express.Router();
const HOST: string = 'http://127.0.0.1:5000';
// for heroku
// const HOST: string = String(process.env.HOST);

/* GET home page. */
// let loggedIn = false

router.all('*', frontendAuthToken, async (req:JwtPayload, res, next) => {
  next()
})

router.get('/', async(req:JwtPayload, res ) => {
  try{

    const config = {
      headers:{
          Authorization:`Bearer ${req.cookies.token}`
      }
    }
    axios.get(`${HOST}/movies/noOfMovies`, config)
    .then(countMoviesRes =>{
    const {noOfMovies, noOfPages} = countMoviesRes.data.data;

    const pageNum = req.query.pageNum;
      
    axios.get(`${HOST}/movies?pageNum=${pageNum || "1"}`, config)
    .then( (apiRes) => {
      const result= apiRes.data.data;
       let { isAdmin, username} = req.user
      res.status(200).render('index', { title: 'Netflix', Link1: 'Signin', Link2:'/Signup', result, loggedIn:true, homelink:"#", isAdmin, username, noOfMovies, noOfPages, pageNum });
    })
    })
  }
  catch(err){
    console.error(err)
  }
});



router.post('/adminsignup', async(req:JwtPayload, res ) => {
  try{
    if(req.user.isAdmin === 'false' ) res.status(403).redirect('/')
  let {username, password, email, fullname} = req.body
  const config = {
    headers:{
        Authorization:`Bearer ${req.cookies.token}`
    }
  }
  axios.post(`${HOST}/users`, {username: username.toLowerCase(), password, email: email.toLowerCase(), fullname:fullname.toLowerCase()}, config)
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

router.get('/cpanel', async (req:JwtPayload, res ) => {

  const status = req.query.deletemovieerr
  if(req.user.isAdmin === 'false'){
    return res.redirect('/')
  }
  if(req.user.isAdmin){
    return res.status(200).render('dashboard', { title: `Admin Dashboard: Netflix`, Link1: 'Signout ', Link2:'', status, loggedIn:true, isAdmin:req.user.isAdmin  });
  }
  res.status(403).redirect('/signin')

});

router.get('/dashboard', (req:JwtPayload, res ) => {
  const loggedIn= true;
  const status = req.query.deletemovieerr
  if(req.user.isAdmin === 'true'){
    return res.redirect(`/cpanel?deletemovieerr=${status}`)
  }
  res.status(200).render('userdashboard', { title: `User Dashboard: Netflix`, Link1: 'Signout ', Username:req.user.username, status, loggedIn, isAdmin:req.user.isAdmin });
});

router.get('/getallusers', (req, res ) => {
  const config = {
    headers:{
        Authorization:`Bearer ${req.cookies.token}`
    }
  }
  axios.get(`${HOST}/users`, config)
    .then( async(apiRes) => {
      let result= apiRes.data;
      res.status(200).render('getall', { title: `All Users : Netflix`, Link1: 'Logout ', Link2:'' , result, loggedIn:true});
    })
    .catch((err)=>{
      console.error(err)
    })
    reqErrorHandler(req, res);
});

router.get('/getallmovies', (req, res ) => {

  const config = {
    headers:{
        Authorization:`Bearer ${req.cookies.token}`
    }
  }
  axios.get(`${HOST}/movies`, config)
    .then( async (apiRes) => {
      let result= apiRes.data.result;
      let {isValid} = await validateCookie(req.signedCookies.username)
      res.status(200).render('getall', { title: `All Users : Netflix`, Link1: 'Logout ', Link2:'' , result, loggedIn:isValid});
    })
    .catch((err)=>{
      console.error(err)
    })
});

router.post('/deletemovie',  (req, res)=> {
  try{
  const config = {
    headers:{
        Authorization:`Bearer ${req.cookies.token}`
    }
  }
  axios.delete(`${HOST}/movies/${req.body.id}`, config)
  .then(apiRes =>{
    res.redirect(`/dashboard?status=${apiRes.data}`)
  })
  .catch(err =>{
    // res.redirect(`/dashboard?status=${err.data}`)
    res.send(err.data)
    console.error(err.data)
  })
}
catch(err){
  return res.status(500).redirect(req.url)
}
})

router.post('/deleteuser', (req, res)=> {

  try{    
    const config = {
      headers:{
          Authorization:`Bearer ${req.cookies.token}`
      }
    }
  let idEmail = req.body.id || req.signedCookies.username
  axios.delete(`${HOST}/users/${idEmail}`, config)
  .then(apiRes =>{
    res.status(apiRes.status).redirect('/dashboard')
  })
  .catch(err =>{
    console.error(err)
    res.status(403).send(err.data)
  })}
  catch(err){
    console.error(err)
    res.send("Error")
  }
});

router.post('/updateuser', (req, res)=> {
  const config = {
    headers:{
        Authorization:`Bearer ${req.cookies.token}`
    }
  }
  req.body = reqbodycheck(req.body);
  const {email, username, id, password, fullname} = req.body;
  if(id){
    axios.put(`${HOST}/users/${id}`, {email, password, fullname, username}, config)
    .then(apiRes =>{
      res.status(apiRes.status).redirect('/dashboard')
    })
    .catch(err =>{
      res.status(403).send(err.data)
    })
  }
  else{
    axios.put(`${HOST}/users`, {email, password, fullname, username}, config)
    .then(apiRes =>{
      res.redirect('/dashboard')
    })
    .catch(err =>{
      // console.error(err)
      res.send(err.data)
    })
  }
});

router.post('/updatemovies',  (req, res)=> {
  const config = {
    headers:{
        Authorization:`Bearer ${req.cookies.token}`
    }
  }
  req.body = reqbodycheck(req.body);
  const {title, description, id, image, price} = req.body;
  axios.put(`${HOST}/movies`, {title, description, image, price, id:0}, config)
  .then(apiRes =>{
    res.redirect('/dashboard')
  })
  .catch(err =>{
    // console.error(err)
    res.send(err.data)
  })
});

router.post('/addmovie', (req:JwtPayload,res)=>{
  try {
    const config = {
      headers:{
          Authorization:`Bearer ${req.cookies.token}`
      }
    }
    axios.post(`${HOST}/movies`, req.body, config)
    .then(apiRes =>{
      res.redirect('/dashboard')
    })
    
  } catch (error) {
    res.redirect('/dashboard')
  }

})

export default router;
