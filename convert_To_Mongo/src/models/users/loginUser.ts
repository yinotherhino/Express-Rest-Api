import fs from 'fs';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { LoginObj, UserObj } from '../../interfaces/typings';
import reqErrorHandler from '../../services/reqErrorHandler';
import initDb from '../../services/initDb.services';
import validateCookie from '../../services/validateCookie';

const databasePath =  "./db/usersDb.json";

const loginUser = ( loginData: LoginObj, req:Request, res:Response )=>{
    try{
        initDb(databasePath);

        fs.readFile(databasePath, async (err, data) => {
            if(err){
                console.error(err)
                return res.status(400).send('An error Occured, from the server.')    
            };

            const database: Array<UserObj>= JSON.parse(data.toString());
            if(req.signedCookies.username){
                let {isValid, isAdmin} = await validateCookie(req.signedCookies.username, database)
                if(isValid === true)
                return (res.status(201).send('Auto login.'));
            }
            if(req.body.username && req.body.password){
                const userData = database.find((user) => {
                    return user.username.toLowerCase() === loginData.username.toString().toLowerCase()
                })
                
                if(userData?.password && await bcrypt.compare(loginData.password, userData?.password)){
                    const index= database.findIndex((user) => {
                        return user.username.toLowerCase() === loginData.username.toString().toLowerCase()
                    })
                    res.cookie('isAdmin', database[index]?.isAdmin || false, {signed:true});
                    res.status(201).cookie('username',loginData.username, {signed: true}).send({message:'Login successful', isAdmin: database[index]?.isAdmin || false});
                    return;
                }
                else{
                    res.status(403).send('error')
                }
        }
        })
        reqErrorHandler(req, res);
    }
    catch(err){
        console.error(err)
    }
}

export default loginUser