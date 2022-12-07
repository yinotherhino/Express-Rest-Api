import {JwtPayload} from 'jsonwebtoken';
import { Response } from "express";

import usersModel from '../../models/usersSchema';
import moviesModel from '../../models/moviesModel';
import reqBodyCheck from '../../services/reqbodycheck';

const updateMovie = async (req :JwtPayload, res: Response)=>{
    try{
        let id = Number(req.params.id) || req.body.id
        const { title, description, image, price } = req.body
        const singleData = { title, description, image, price }
        const username = req.user.username;
        const user = await usersModel.findOne({username});
        const movie = await moviesModel.findOne({id:id})
        if(!user ){
            return res.status(403).json({Error:"Access Denied"})
        }
        else{
            const movie = await moviesModel.updateOne({id:id}, singleData);
            if(movie){
                return res.status(201).json({message:"Movie updated successfully", data:movie});
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