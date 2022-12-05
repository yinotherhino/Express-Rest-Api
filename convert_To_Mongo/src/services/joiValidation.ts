import Joi from 'joi';
import bcrypt from 'bcrypt';
import {type Request, type Response} from 'express';
import { type UserObj } from '../interfaces/typings';
import jwt, {type JwtPayload} from 'jsonwebtoken';

export const RegisterSchema = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    username: Joi.string().required(),
	fullname: Joi.string(),
});



export const option = {
	abortEarly: false,
	errors: {
		wrap: {
			label: '',
		},
	},
};

export const LoginSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
});


export const generateSalt = async () => await bcrypt.genSalt();

export const generatePassword = async (password: string, salt: string) => await bcrypt.hash(password, salt);

export const generateSignature = async(payload:JwtPayload)=>{return jwt.sign(payload, process.env.APP_SECRET as string,{expiresIn:"5d"})}
	
export const verifySignature= async(signature:string)=>{return jwt.verify(signature, process.env.APP_SECRET as string) as JwtPayload}

export const validatePassword = async(enteredPassword:string, savedPassword:string, salt:string)=>{
    return await generatePassword(enteredPassword,salt) === savedPassword
}