import {JwtPayload} from 'jsonwebtoken';
import { Request, Response } from 'express';
import { moviesObj } from '../../interfaces/typings';
import reqErrorHandler from '../../services/reqErrorHandler';
import {v4} from 'uuid';
import usersModel from '../../models/usersSchema';
import moviesModel from '../../models/moviesModel';


const addMovie = async (req :JwtPayload, res: Response) =>{
    try{
        let { title, description, image, price } = req.body;
        
        if(!title || !description || !image || !price){
            res.status(400).json({Error: 'You need to send the full movie details'});
        }
        const singleData = { title, description, image, price, addedBy:"" }
        const userEmail = req.user.email;
        const user = await usersModel.findOne({email:userEmail});
        if(user){
            singleData.addedBy = req.user.email;
            moviesModel.create({...singleData, id:v4()})
        }
    }
    catch(err){
        console.error(err);
        return res.status(500).json({Error: 'An error ccured'});
		
    }
}

export default addMovie;
