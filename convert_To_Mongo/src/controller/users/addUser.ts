import { Request, Response } from 'express';
import bcrypt, { genSalt } from 'bcrypt';

import { UserObj } from '../../interfaces/typings';
import usersModel from '../../models/usersSchema';

const addUser = async ( postData: UserObj, req:Request, res:Response )=>{
  try {
    const {email, password, fullname, username} = postData;

    const emailExist = await usersModel.findOne({email});
    const userNameExist = await usersModel.findOne({username});
		if (emailExist) {
			return res.status(400).json({Error: 'Email Already exists'});
		}
    if (userNameExist) {
			return res.status(400).json({Error: 'Username Already exists'});
		}
    const salt = await genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)

		return await usersModel.create({email, password: hashedPassword, fullname, username, salt})
			.then(data => {
				return res.status(200).json({message: 'signup successful'});
			})
			.catch((error:unknown) => {
        console.log(error)
				return res.status(200).json({Error: 'An error ccured'});
			});


} catch (err) {
    console.error(err)
}
  
}

export default addUser;