import fs from 'fs';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { LoginObj, UserObj } from '../../interfaces/typings';
import validateCookie from '../../services/validateCookie';
import usersModel from '../mongo/usersSchema';
import { generateSignature, validatePassword } from '../../services/joiValidation';


const loginUser = async( loginData: LoginObj, req:Request, res:Response )=>{
    try{
        const {username, password} = loginData
        const User = await usersModel.findOne({username})

        if(User){
            const isCorrectPassword = await validatePassword(password, User.password, User.salt);
            if(isCorrectPassword){
                const token = await generateSignature({username, isAdmin:User.isAdmin})
                return res.status(201).json({message:'Login successful', isAdmin: User.isAdmin || false, token});
            }
        }
        return res.status(401).json({Error:"Username or password Incorrect"})
    }
    catch(err){
        return res.status(500).json({Error:"Server error"})
    }
}

export default loginUser