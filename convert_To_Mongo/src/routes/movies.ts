import express, { Request, Response } from "express";
import { moviesObj } from "../interfaces/typings";
import reqErrorHandler from "../services/reqErrorHandler";
import deleteMovie from '../models/movies/deleteMovie';
import addMovie from '../models/movies/addMovie';
import updateMovie from "../models/movies/updateMovie";
import reqBodyCheck from '../services/reqbodycheck';
import moviesModel from "../models/mongo/moviesModel";


const router = express.Router();

/* GET movies listing. */
router.route('/')
.delete((req:Request, res:Response)=>{
    try{
        let email = req.body.email
        if(email){
            console.log(email)
            deleteMovie(email, req, res)
        }
        else{
            res.status(400).send("Bad Request, you need to send the id.")
        }
    }
    catch(err){
        console.error(err)
    }
})
.get( async (req: Request, res: Response) => {
    try{
        const movies = await moviesModel.find({})
        if(movies){
            return res.status(200).json({message:"Success", data: movies});
        }
        else{
            return res.status(200).json({Error: 'An error ccured'});
        }

    }
    catch(err){
        console.error(err)
        return res.status(200).json({Error: 'An error ccured'});
		
    }
})

.post((req:Request, res:Response)=>{
    try{

        let { title, description, image, price } = req.body
        if(title && description && image && price){
            const postBody :moviesObj = { title, description, image, price, id:0}
            addMovie(postBody, req, res, "Data Added Successfully.", "Error Adding Data.")
        }
        else{
            res.status(404).send("Bad Request, you need to send the full movie details, (title, description, image, price)")
        }
        }
    catch(err){
        console.error(err)
		return res.status(200).json({Error: 'An error ccured'});

    }
})

.put((req:Request, res:Response)=>{
    try{
        reqErrorHandler(req, res);

        let { title, description, image, price } = req.body
        if(title || description || image || price){
            let putBody :moviesObj = { title, description, image, price, id:0 }
            putBody = reqBodyCheck(putBody)
            updateMovie(putBody, req, res, "Data Added Successfully.", "Error Adding Data.")
        }
        else{
            res.status(404).send("Bad Request, you need to send the full movie details, (title, description, image, price)")
        }
        }
    catch(err){
        console.error(err)
    }
});

router.route('/:id')
.get( async (req: Request, res: Response) => {
    try{
        if(req.params.id){
            const id= req.params.id
            const movie = await moviesModel.find({id})
          if(movie){
            return res.status(200).json({data:movie, message:"Success"});
            }
            else{
            return res.status(404).json({message:'Not found'});
            }
        }
        else{
        res.status(400).send('You need to add a valid in the request params');
        }
    }
    catch(err){
        console.error(err)
        return res.status(200).json({Error: 'An error ccured'});
    }
  })

.put((req:Request, res:Response)=>{
    try{
        let id = Number(req.params.id)
        let { title, description, image, price } = req.body
        if(id){
            console.log(id)
            const putBody :moviesObj = {id}
            if(title){
                putBody.title = title
            }
            if(description){
                putBody.description = description
            }
            if(image){
                putBody.image = image;
            }
            if(price){
                putBody.price = price
            }
            updateMovie( putBody, req, res, "Data Updated Successfully.", "Data not found")
        }
        else{
            res.status(404).send("Bad Request, you need to send the movie details, (title or description or image or price and id)")
        }
        reqErrorHandler(req, res);
    }
    catch(err){
        console.error(err)
    }
})

.delete((req:Request, res:Response)=>{
    try{
        let id = req.params.id || req.body.id
        if(id){console.log(id)
            deleteMovie(Number(id), req, res)
        }
        else{
            res.status(404).send("Bad Request, you need to send the id.")
        }
        reqErrorHandler(req, res);
    }
    catch(err){
        console.error(err)
    }
})



export default router;