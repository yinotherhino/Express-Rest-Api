import {JwtPayload} from 'jsonwebtoken';
import { Request, Response } from 'express';
import {v4} from 'uuid';
import usersModel from '../../models/usersSchema';
import moviesModel from '../../models/moviesModel';


const addMovie = async (req :JwtPayload, res: Response) =>{
    try{
        let { title, description, image, price } = req.body;

        if(!title || !description || !image || !price){
            return res.status(400).json({Error: 'You need to send the full movie details'});
        }
        const singleData = { title, description, image, price, addedBy:"" }
        const username = req.user.username;
        const user = await usersModel.findOne({username});
        if(user){
            singleData.addedBy = user.email;
            const movie = await moviesModel.create({...singleData, id:v4()})
            if(movie){
                return res.status(201).json({message:"Movie added successfully", data:movie})
            }
        }
        return res.status(401).json({Error:"Unauthorized"})

    }
    catch(err){
        console.error(err);
        return res.status(500).json({Error: 'An error ccured'});
		
    }
}

export default addMovie;
