import fs from 'fs';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { UserObj } from '../../interfaces/typings';
import reqErrorHandler from '../../services/reqErrorHandler';
import initDb from '../../services/initDb.services';

const databasePath =  "./db/usersDb.json";

const addUser = ( postData: UserObj, req:Request, res:Response )=>{
  try {

  initDb(databasePath);

  fs.readFile(databasePath, async (err, data) => {
    if(err){
      console.error(err)
      return res.status(400).send('An error Occured, from the server.')
    };
    
    const database= JSON.parse(data.toString());
    const userExists = alreadyExists(postData, database, req, res)
    if(userExists === false){
      postData.id = database.length? database[database.length -1].id +1 : 1;
      postData.isAdmin= false;
      postData.password = await bcrypt.hash(postData.password, 10);

      database.push(postData);

      fs.writeFile(databasePath, JSON.stringify(database, null, "  "), (err)=>{
      if(err){
        console.error(err);
        return res.status(500).send('An error Occured, from the server.'); 
      }
      console.log('User added successfully.');
      return res.status(201).cookie('isAdmin', false, {signed: true}).cookie('username',postData.username, {signed: true}).send('user Added successfully');
    });
  }
  reqErrorHandler(req, res);
  })
      
} catch (err) {
    console.error(err)
}
  
}

export const alreadyExists = (postData: UserObj, database: Array<UserObj>, req:Request, res:Response ): boolean => {
  const emailExists = database.find(item => item.email == postData.email);
  const userNameExists = database.find(item => item.username == postData.username);
  if(emailExists){
    res.status(404).send({message: "Email already Exists."})
    return true;
  }
  if(userNameExists){
    res.status(404).send({message: "Username already Exists."})
    return true;
  }
  return false;
}
export default addUser;