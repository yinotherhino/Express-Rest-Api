import fs from 'fs';
import { Request, Response, urlencoded } from 'express';

import { UserObj } from '../../interfaces/typings';
import reqErrorHandler from '../../services/reqErrorHandler';
import validateCookie from '../../services/validateCookie';
import reqbodycheck from '../../services/reqbodycheck';

const databasePath =  "./db/usersDb.json";

const updateUser = async( putData: UserObj, req:Request, res:Response )=>{

  // fs.readFile(databasePath, async (err, data) => {
  //   if(err){ 
  //       console.error(err)
  //       return res.status(400).send('An error Occured, from the server.')    
  //   };
  //     const database: Array<UserObj>= JSON.parse(data.toString());

      // if(req.signedCookies.isAdmin == 'false' || req.cookies.isAdmin == 'false'){
      //   if(req.signedCookies.username){
      //     let {isValid} = await validateCookie(req.signedCookies.username || req.cookies.username, database) 
      //     if(!isValid){
      //       return res.status(403).send('Access Denied, you need to login.')
      //     }
      //   }
      // }
      // let index = database.findIndex(user => Number(user.id) === Number(putData.id) )
      // if(index === -1) index = database.findIndex(user => user.email === putData.email )

      // if(index !== -1){
      //   if( (req.cookies.username !== database[index].username 
      //     && req.cookies.isAdmin==='false') ||  (req.signedCookies.username !== database[index].username 
      //       && req.signedCookies.isAdmin==='false') ) {
      //     res.status(403).json({"message":"Access denied."})
      //     return;
      //   }
      //   putData = reqbodycheck(putData)
      //   console.log(putData)
      //   database[index] = {...database[index], ...putData}

      //   fs.writeFile(databasePath, JSON.stringify(database, null, "  "), (err)=>{
      //   if(err){
      //     console.error(err);
      //     return res.status(500).send('An error Occured, from the server.');
      //   }
      //   console.log('User Updates successfully.');
      //   return res.status(201).send('user Updated successfully');
      // // });
      // }
      // else{
      //     return res.status(404).send("User does not exist. Check your credentials.")
      // }
  // })
}

export default updateUser;