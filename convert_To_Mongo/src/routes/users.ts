import express, { Request, Response } from "express";

import { UserObj, UserResObj } from "../interfaces/typings";

import addUser from '../controller/users/addUser';
import updateUser from "../controller/users/updateUser";
import deleteUser from "../controller/users/deleteUser";
import reqbodycheck from '../services/reqbodycheck';
import { option, RegisterSchema } from "../services/joiValidation";
import usersModel from "../models/usersSchema";
import { authToken } from "../middleware/authToken";

const router = express.Router();

/* GET users listing. */
router.post('/', (req:Request, res:Response)=>{
  try{
  let { username, password, email, fullname } = req.body
  const validateResult = RegisterSchema.validate(req.body, option)
  if(validateResult.error){
    return res.status(400).json({
      Error: validateResult.error.details[0].message,
    });
  }

  const postBody :UserObj = { username: username.toLowerCase(), password, email: email.toLowerCase(), fullname: fullname.toLowerCase() || '', id:0}
  addUser(postBody, req, res)
    
}
catch(err){
  console.error(err)
  return res.status(500).json({Error:"Server Error"})
}
})

router.route('/')
.get (authToken, async(req: Request, res: Response, next ) => {
  try{
    const datas = usersModel.find({},{password:0})
    return res.status(200).json(datas);
  }
  catch(err){
    console.error(err)
    return res.status(500).json({Error:"Server Error"})
  }
})



.put(authToken, (req:Request, res:Response)=>{
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
  }
  catch(err){
    console.error(err)
    return res.status(500).json({Error:"Server Error"})
  }
})

router.route('/:idEmail')
.delete(authToken,  (req:Request, res:Response)=>{
  try{
    let { idEmail } = req.params
    if( idEmail ){
      deleteUser(idEmail, req, res)
    }
    else{
      res.status(404).send("Bad Request, you need to send (email)  details.")
    }
  }
  catch(err){
    console.error(err)
    return res.status(500).json({Error:"Server Error"})
  }
})

.get(authToken, async (req: Request, res: Response) => {
  try{
    if(req.params.id){
      const user = await usersModel.findOne({id:req.params.id}).projection({password:0})

      if(user){
      return res.status(200).json(user);
      }
      
      res.status(404).send('Not found');
  
    }
    else{
      res.status(400).json({Error:'You need to add a valid id in the request params'});
    }
  }
  catch(err){
    console.error(err)
    return res.status(500).json({Error:"Server Error"})
  }
})

.put(authToken,  ( req:Request, res:Response ) => {
  try{
    const id= Number(req.params.id)
    req.body = reqbodycheck(req.body)
    let { username, password, email, fullname } = req.body
    if( email || password || username || fullname ){
      const putData :UserObj = { username, password, email, fullname, id: id || 0 }

      updateUser(putData, req, res)
    }
    else{
      res.status(404).send("Bad Request, you need to send either (email, password, fullname or username) registration details.")
    }
  }
  catch(err){
    console.error(err)
  }
})



export default router;