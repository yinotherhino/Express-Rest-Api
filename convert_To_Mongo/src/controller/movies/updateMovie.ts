import {JwtPayload} from 'jsonwebtoken';
import { Response } from "express";

import { moviesObj } from "../../interfaces/typings";
import usersModel from '../../models/usersSchema';
import moviesModel from '../../models/moviesModel';
import reqBodyCheck from '../../services/reqbodycheck';

const updateMovie = async (req :JwtPayload, res: Response)=>{
    try{
        let id = Number(req.params.id)
        const { title, description, image, price } = req.body
        const singleData = { title, description, image, price, id:'' }
        const userEmail = req.user.email;
        const user = await usersModel.findOne({email:userEmail});
        const movie = await moviesModel.findOne({id:singleData.id})
        if(!user || movie?.addedBy!= userEmail){
            return res.status(403).json({Error:"Access Denied"})
        }
        else{
            const movie = await moviesModel.updateOne({id:singleData.id}, singleData)
            if(movie){
                return res.status(201).json({message:"Movie added successfully", data:movie});
            }
            else{
                return res.status(404).json({Error:"Movie not found"})
            }
        }
        }
    catch(err){
        console.error(err);
        res.status(500).json({Error:"Server Error"})
    }
}

export default updateMovie;