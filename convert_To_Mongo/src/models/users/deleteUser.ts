import fs from 'fs';
import { Request, Response, urlencoded } from 'express';

import { UserObj } from '../../interfaces/typings';
import reqErrorHandler from '../../services/reqErrorHandler';
import validateCookie from '../../services/validateCookie';

const databasePath =  "./db/usersDb.json";

const deleteUser = ( idEmail: string, req:Request, res:Response )=>{


  // fs.readFile(databasePath, async (err, data) => {
  //   if(err){
  //     res.status(400).send('An error Occured, from the server.')
  //     return console.error(err)
  //   };
    
  //   const database: Array<UserObj>= JSON.parse(data.toString());
  //   if(req.signedCookies.isAdmin === 'false' && req.cookies.isAdmin === 'false'){
  //     if( req.signedCookies.username || req.cookies.username ){
  //       let { isValid } = await validateCookie(req.signedCookies.username || req.cookies.username, database)
  //       if(!isValid){
  //         return res.status(403).send('Access Denied, you need to login.')
  //       }
  //     }
  //     return res.status(403).send('Access Denied, you need to login.')
  //   }
  //   const index = database.findIndex(user => user.id === Number(idEmail) || user.email===idEmail )

  //   if(index !== -1){
  //     if( (req.cookies.username !== database[index].username 
  //       && req.cookies.isAdmin==='false') ||  (req.signedCookies.username !== database[index].username 
  //         && req.signedCookies.isAdmin==='false') ) {
  //       return res.status(403).json({"message":"Access denied."})
  //     }
  //       database.splice(index, 1);

  //     fs.writeFile(databasePath, JSON.stringify(database, null, "  "), (err)=>{
  //     if(err){
  //       console.error(err);
  //       return res.status(400).send('An error Occured, from the server.');
  //     }
  //     console.log('User updated successfully.');
  //     return res.status(204).send({message: 'user updated successfully'});
  //   });
  //   }
  //   else{
  //       return res.status(404).send("User does not exist. Check your credentials.")
  //   }
}

export default deleteUser;