import express, { Request, Response } from "express";
import { moviesObj } from "../interfaces/typings";
import reqErrorHandler from "../services/reqErrorHandler";
import deleteMovie from '../controller/movies/deleteMovie';
import addMovie from '../controller/movies/addMovie';
import updateMovie from "../controller/movies/updateMovie";
import reqBodyCheck from '../services/reqbodycheck';
import moviesModel from "../models/moviesModel";


const router = express.Router();

/* GET movies listing. */
router.get('/noOfmovies', async (req, res)=>{
    const noOfMovies = await moviesModel.find({}).count()
    // const  = movies.length;
    console.log(noOfMovies)
    const noOfPages = Math.ceil(noOfMovies/5)
    return res.status(200).json({message:"Succesful", data:{noOfMovies, noOfPages }})
})
router.route('/')
.delete(deleteMovie)
.get( async (req: Request, res: Response) => {
    try{
        let movies = await moviesModel.find({}).limit(5);
        if(req.query.pageNum){
            const pageNum = Number(req.query.pageNum)
            movies = await moviesModel.find({}).limit(5).skip(pageNum * 5)
        }

        if(movies){
            return res.status(200).json({message:"Successful", data: movies});
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

.post(addMovie)

.put(updateMovie);

router.route('/:id')
.get( async (req: Request, res: Response) => {
    try{
        if(req.params.id){
            const id= req.params.id
            const movie = await moviesModel.find({id})
          if(movie){
            return res.status(200).json({data:movie, message:"Successful"});
            }
            else{
            return res.status(404).json({message:'Not found'});
            }
        }
        else{
        res.status(400).json({Error:'You need to add a valid in the request params'});
        }
    }
    catch(err){
        console.error(err)
        res.status(500).json({Error:"Server error"})
    }
  })

.put(updateMovie)

.delete(deleteMovie)



export default router;
