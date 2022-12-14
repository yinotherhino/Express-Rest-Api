import {JwtPayload} from 'jsonwebtoken';
import { Response } from "express";

import usersModel from '../../models/usersSchema';
import moviesModel from '../../models/moviesModel';

const deleteMovie = async (req :JwtPayload, res: Response )=>{
    try{
        let email = req.body.email
        const id = req.params.id || req.body.id;
        if(!email && !id){
            return res.status(400).json({Error:"Bad Request, you need to send the id or email."})
        }
        
        const userEmail = req.user.email;
        const user = await usersModel.findOne({email:userEmail});
        const movie = await moviesModel.findOne({id});
        if(movie?.addedBy === userEmail || user?.isAdmin === true){
            const deletedMovie = await moviesModel.deleteOne({id});
            if(deletedMovie){
                return res.status(204).end();
            }
            return res.status(404).json({Error: "Movie not found"});
        }
        else{
            return res.status(400).json({Error: "Access Denied"})
        }
        }
    catch(err){
        console.error(err);
        return res.status(200).json({Error: 'An error ccured'});
    }
}

export default deleteMovie;