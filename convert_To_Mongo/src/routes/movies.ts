import express, { Request, Response } from "express";
import fs from "fs";
import { moviesObj } from "../interfaces/typings";
import reqErrorHandler from "../services/reqErrorHandler";
import deleteMovie from '../models/movies/deleteMovie';
import addMovie from '../models/movies/addMovie';
import updateMovie from "../models/movies/updateMovie";
import reqBodyCheck from '../services/reqbodycheck';


const router = express.Router();
const databasePath = './db/moviesDb.json';

/* GET movies listing. */
router.route('/')
.delete((req:Request, res:Response)=>{
    try{
        let email = req.body.email
        if(email){
            console.log(email)
            deleteMovie(databasePath, email, req, res)
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
.get( async(req: Request, res: Response) => {
    try{
        let readDb = fs.createReadStream(databasePath, 'utf-8')
        readDb.on('data', (chunk)=>{
            let result = JSON.parse(chunk.toString())
            res.status(200).json({result});
        });
        readDb.on('error', (err)=>{
            console.error(err)
            res.status(500).json({"message": "server erro"});
        });

    }
    catch(err){
        console.error(err)
    }
})

.post((req:Request, res:Response)=>{
    try{
        reqErrorHandler(req, res);

        let { title, description, image, price } = req.body
        if(title && description && image && price){
            const postBody :moviesObj = { title, description, image, price, id:0}
            addMovie(databasePath, postBody, req, res, "Data Added Successfully.", "Error Adding Data.")
        }
        else{
            res.status(404).send("Bad Request, you need to send the full movie details, (title, description, image, price)")
        }
        }
    catch(err){
        console.error(err)
    }
})

.put((req:Request, res:Response)=>{
    try{
        reqErrorHandler(req, res);

        let { title, description, image, price } = req.body
        if(title || description || image || price){
            let putBody :moviesObj = { title, description, image, price, id:0 }
            putBody = reqBodyCheck(putBody)
            updateMovie(databasePath, putBody, req, res, "Data Added Successfully.", "Error Adding Data.")
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
.get( (req: Request, res: Response) => {
    try{
        if(req.params.id){
        fs.readFile(databasePath, (err, data) => {
            if(err){
            console.error(err);
            return res.status(400).send("Error Occured")
            }
            let datas: Array<moviesObj> = JSON.parse(data.toString());
            let index = datas.findIndex(item => Number(item.id) === Number(req.params.id))
            if(index > -1){
            res.status(200).json((datas[index]));
            }
            else{
            res.status(404).send('Not found');
            }
        })
        }
        else{
        res.status(400).send('You need to add a valid in the request params');
        }
        reqErrorHandler(req, res);
    }
    catch(err){
        console.error(err)
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
            updateMovie(databasePath, putBody, req, res, "Data Updated Successfully.", "Data not found")
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
            deleteMovie(databasePath, Number(id), req, res)
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