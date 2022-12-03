import express from 'express';
import axios from 'axios';

import reqErrorHandler from '../services/reqErrorHandler';
import validateCookie from '../services/validateCookie';
import reqbodycheck from '../services/reqbodycheck';

const router = express.Router();
// const HOST: string = 'http://127.0.0.1:4000';
// for heroku
const HOST: string = String(process.env.HOST);

/* GET home page. */
let loggedIn = false
router.all('*', async (req, res, next) => {
  let { isValid } = await  validateCookie(req.signedCookies.username)
  loggedIn = isValid
  next()
})

router.get('/', async(req, res ) => {
  try{
  reqErrorHandler(req, res)
  axios.get(`${HOST}/movies`, {withCredentials: true})
    .then( async(apiRes) => {
      let result= apiRes.data.result;
       let {isValid, isAdmin} = await  validateCookie(req.signedCookies.username)
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

router.post('/signin', async(req, res ) => {
  try{
  reqErrorHandler(req, res)

  let {username, password} = req.body

  axios.post(`${HOST}/login`, {username: username.toLowerCase(), password}, {withCredentials: true})
  .then( apiRes => {
      if(apiRes.status===201){
      res.cookie('username', username.toLowerCase(), {signed: true})
      res.cookie('isAdmin', apiRes.data.isAdmin, {signed: true})
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
    console.error(err.data )
    return res.status(401).render('signin', { title: 'Login: Netflix', Link1: '', Link2:'' , signupError: 'An error Ocurred.'});
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


router.get('/signin', (req, res ) => {
  try{
    if(loggedIn) {
      console.log(loggedIn)
      return res.redirect('/dashboard')}
  res.status(200).render('signin', { title: 'Login: Netflix', Link1: '', Link2:'' ,loggedIn });
  }catch(err){
    console.error(err)
  }
});

router.get('/signout', (req, res ) => {
  try{
    loggedIn = false;
    res.clearCookie("username");
    res.clearCookie("isAdmin");
    res.status(200).redirect('/');
}catch(err){
  console.error(err)
}
});

router.get('/cpanel', async (req, res ) => {
  const status = req.query.deletemovieerr
  if(!req.signedCookies.isAdmin || req.signedCookies.isAdmin === 'false'){
    return res.redirect('/')
  }
  const {isValid, isAdmin} = await validateCookie(req.signedCookies.username)
  if(isValid && isAdmin){
    console.log(req.signedCookies)
    return res.status(200).render('dashboard', { title: `Admin Dashboard: Netflix`, Link1: 'Signout ', Link2:'', status,loggedIn  });
  }
  res.status(403).redirect('/signin')

});

router.get('/dashboard', (req, res ) => {
  const status = req.query.deletemovieerr
  console.log(req.query.deletemovieerr)
  if(req.signedCookies.isAdmin === 'true'){
    return res.redirect(`/cpanel?deletemovieerr=${status}`)
  }
  if(!req.signedCookies.username){
    return res.status(403).redirect('/')
  }
  res.status(200).render('userdashboard', { title: `User Dashboard: Netflix`, Link1: 'Signout ', Username:req.signedCookies.username, status, loggedIn });
});

router.get('/getallusers', (req, res ) => {
  axios.get(`${HOST}/users`, {withCredentials: true})
    .then( async(apiRes) => {
      let result= apiRes.data;
      let {isValid} = await validateCookie(req.signedCookies.username)
      res.status(200).render('getall', { title: `All Users : Netflix`, Link1: 'Logout ', Link2:'' , result, loggedIn:isValid});
    })
    .catch((err)=>{
      console.error(err)
    })
    reqErrorHandler(req, res);
});

router.get('/getallmovies', (req, res ) => {
  const headers = {
    Cookie: `isAdmin=${req.signedCookies.isAdmin}; username=${req.signedCookies.username}`
  }
  axios.get(`${HOST}/movies`, {withCredentials: true, headers: headers})
    .then( async (apiRes) => {
      let result= apiRes.data.result;
      let {isValid} = await validateCookie(req.signedCookies.username)
      res.status(200).render('getall', { title: `All Users : Netflix`, Link1: 'Logout ', Link2:'' , result, loggedIn:isValid});
    })
    .catch((err)=>{
      console.error(err)
    })
    reqErrorHandler(req, res);
});

router.post('/deletemovie', (req, res)=> {
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

router.post('/deleteuser', (req, res)=> {
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
    console.error(err)
    res.send("Error")
  }
});

router.post('/updateuser', (req, res)=> {
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

router.post('/updatemovies', (req, res)=> {
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
    console.error(err)
    res.send(err.data)
  })
});

export default router;
