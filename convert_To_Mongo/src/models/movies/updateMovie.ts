import {JwtPayload} from 'jsonwebtoken';
import { Response } from "express";

import { moviesObj } from "../../interfaces/typings";
import usersModel from '../mongo/usersSchema';
import moviesModel from '../mongo/moviesModel';

const updateMovie = async (singleData: moviesObj, req :JwtPayload, res: Response, successMessage: string, failureMessage:string)=>{
    try{
        const userEmail = req.user.email;
        const user = await usersModel.findOne({email:userEmail});
        const movie = await moviesModel.findOne({id:singleData.id})
        if(!user || movie?.addedBy!= userEmail){
            return res.status(403).json({Error:"Access Denied"})
        }
        else{
            const movie = await moviesModel.updateOne({id:singleData.id}, singleData)
            if(movie){
                return res.status(201).json({message:successMessage, data:movie});
            }
            else{
                return res.status(404).json({Error:"Movie not found"})
            }
        }
        }
    catch(err){
        console.error(err);
        return res.status(200).json({Error: 'An error ccured'});
    }
}

export default updateMovie;