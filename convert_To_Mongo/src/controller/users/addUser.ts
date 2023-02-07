import { Request, Response } from 'express';
import bcrypt, { genSalt } from 'bcrypt';

import { UserObj } from '../../interfaces/typings';
import usersModel from '../../models/usersSchema';
import { option, RegisterSchema } from '../../services/joiValidation';

const addUser = async (req:Request, res:Response )=>{
  try {

	const { username, password, email, fullname } = req.body;
	const postData = { username: username.toLowerCase(), password, email: email.toLowerCase(), fullname, id:0}

	const validateResult = RegisterSchema.validate(req.body, option)
	if(validateResult.error){
		return res.status(400).json({
		Error: validateResult.error.details[0].message,
		});
	}

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

		return await usersModel.create({email, password: hashedPassword, fullname, username, salt, isAdmin:'false'})
			.then(data => {
				return res.status(201).json({message: 'signup successful'});
			})
			.catch((error:unknown) => {
				return res.status(500).json({Error: 'An error ccured'});
			});

} catch (err) {
	console.log(err)
    res.status(500).json({Error:"Server Error"})
}
}

export default addUser;