import {JwtPayload} from 'jsonwebtoken';
import { Request, Response } from 'express';
import { moviesObj } from '../../interfaces/typings';
import reqErrorHandler from '../../services/reqErrorHandler';
import {v4} from 'uuid';
import usersModel from '../../models/usersSchema';
import moviesModel from '../../models/moviesModel';


const addMovie = async ( singleData: moviesObj, req :JwtPayload, res: Response, successMessage: string, failureMessage:string) =>{
    try{
        const userEmail = req.user.email;
        const user = await usersModel.findOne({email:userEmail});
        if(user){
            singleData.addedBy = req.user.email;
            moviesModel.create({...singleData, id:v4()})
        }
    }
    catch(err){
        console.error(err);
        return res.status(200).json({Error: 'An error ccured'});
		
    }
}

export default addMovie;
