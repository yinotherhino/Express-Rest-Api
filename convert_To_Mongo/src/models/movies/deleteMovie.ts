import fs from 'fs';
import { Request, Response } from "express";

import { moviesObj } from "../../interfaces/typings";
import reqErrorHandler from "../../services/reqErrorHandler";

const deleteMovie = ( databasePath: string, id: number, req :Request, res: Response )=>{
    try{
        console.log("ttt",req.cookies.username)
        if(!req.signedCookies.username && !req.cookies.username){
            return res.status(403).send("Only logged in users can delete a movie.")
        }
        const failureMessage = 'Id not found.';
        let database: Array<moviesObj> = [];
        fs.readFile(databasePath, (err, data) => {
            if(err) return console.error(err);
            database= JSON.parse(data.toString());
            
            let index = database.findIndex(movie => movie.id === id);
            if(index == -1){
                res.status(404).send(failureMessage);
            }
            else{
            if((req.cookies.username !== database[index].addedBy && req.cookies.isAdmin==='false') ||  (req.signedCookies.username !== database[index].addedBy && req.signedCookies.isAdmin==='false') ) {
                return res.status(403).send('Access denied, you can only delete a movie you added')
            }
            database.splice(index, 1);
            fs.writeFile(databasePath, JSON.stringify(database, null, " "), 'utf-8', (err)=>{
                if(err){
                    console.log(err);
                    res.status(400).send("An error Occured");
                    return;
                }
                else{
                console.log("Data Deleted Successfully!");
                res.status(204).send({message: "Movie Deleted Successfully."});
                }
            });
        }   
        });
        reqErrorHandler(req, res)
        }
    catch(err){
        console.error(err);
    }
}

export default deleteMovie;