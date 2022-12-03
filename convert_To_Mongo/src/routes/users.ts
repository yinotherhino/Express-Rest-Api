import express, { Request, Response } from "express";
import fs from 'fs';

import { UserObj, UserResObj } from "../interfaces/typings";

import addUser from '../models/users/addUser';
import initDb from "../services/initDb.services";
import reqErrorHandler from "../services/reqErrorHandler";
import updateUser from "../models/users/updateUser";
import deleteUser from "../models/users/deleteUser";
import reqbodycheck from '../services/reqbodycheck';

const router = express.Router();
const databasePath = './db/usersDb.json';

/* GET users listing. */
router.route('/')
.get (async(req: Request, res: Response, next) => {
  try{
  initDb(databasePath)
    fs.readFile(databasePath, (err, data) => {
      if(err){
        console.error(err);
        return res.status(500).send("Error Occured")
      }
      let datas: Array<UserResObj>= JSON.parse(data.toString());
      datas.forEach((item, index)=> {
        delete item['password']
        datas[index]= item;
      })
        res.status(200).json(datas);
    })
    reqErrorHandler(req, res)
  }
  catch(err){
    console.error(err)
    next(err)
  }
})

.post( (req:Request, res:Response)=>{
  try{
    let { username, password, email, fullname } = req.body
    if( email && password && username){
      const postBody :UserObj = { username: username.toString().toLowerCase(), password, email: email.toString().toLowerCase(), fullname: fullname== undefined? undefined:fullname.toString().toLowerCase(), id:0}
      addUser(postBody, req, res)
    }
    else{
      res.status(404).send("Bad Request, you need to send the (email, password and username) registration details.")
    }
    reqErrorHandler(req, res)
}
catch(err){
  console.error(err)
}
})

.put((req:Request, res:Response)=>{
  try{
    req.body = reqbodycheck(req.body)
    let { username, password, email, fullname } = req.body
    if( email && (password || username || fullname) ){
      const putData :UserObj = { username, password, email, fullname, id:0 }
      updateUser(putData, req, res)
    }
    else{
      res.status(404).send("Bad Request, you need to send either (email, password, fullname or username) registration details.")
    }
    reqErrorHandler(req, res)
  }
  catch(err){
    console.error(err)
  }
})

router.route('/:idEmail')
.delete( (req:Request, res:Response)=>{
  try{
    let { idEmail } = req.params
    if( idEmail ){
      deleteUser(idEmail, req, res)
    }
    else{
      res.status(404).send("Bad Request, you need to send (email)  details.")
    }
    reqErrorHandler(req, res)
  }
  catch(err){
    console.error(err)
  }
})

.get((req: Request, res: Response) => {
  try{
  initDb(databasePath)
  if(req.params.id){
    fs.readFile(databasePath, (err, data) => {
      if(err){
        console.error(err);
        return res.status(400).send("Error Occured")
      }
      let datas: Array<UserResObj> = JSON.parse(data.toString());
      let index = datas.findIndex(item => Number(item.id) === Number(req.params.id))
      if(index > -1){
        delete datas[index].password;
      res.status(200).json((datas[index]));
      }
      else{
        res.status(404).send('Not found');
      }
    })
  }
  else{
    res.status(400).send('You need add a valid in the request params');
  }
    reqErrorHandler(req, res)
  }
  catch(err){
    console.error(err)
  }
})

.put((req:Request, res:Response)=>{
  try{
    const id= Number(req.params.id)
    req.body = reqbodycheck(req.body)
    let { username, password, email, fullname } = req.body
    if( email || password || username || fullname ){
      const putData :UserObj = { username, password, email, fullname, id: id || 0 }
      // console.log(putData)
      updateUser(putData, req, res)
    }
    else{
      res.status(404).send("Bad Request, you need to send either (email, password, fullname or username) registration details.")
    }
    reqErrorHandler(req, res)
  }
  catch(err){
    console.error(err)
  }
})



export default router;