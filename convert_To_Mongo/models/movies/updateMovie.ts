import fs from 'fs';
import { Request, Response } from "express";

import { moviesObj } from "../../interfaces/typings";
import reqErrorHandler from "../../services/reqErrorHandler";
import initDb from '../../services/initDb.services';

const updateMovie = async (databasePath: string, singleData: moviesObj, req :Request, res: Response, successMessage: string, failureMessage:string)=>{
    try{
        if(!req.signedCookies.username && !req.cookies.username){
            return res.status(403).send("Only logged in users can update a movie.")
        }
        initDb(databasePath);
        let database: Array<moviesObj> = [];
        fs.readFile(databasePath, (err, data) => {
            if(err) return console.error(err);
            database= JSON.parse(data.toString());
            let index = database.findIndex(movie => (movie.title?.toString().toLowerCase()) === (singleData.title?.toString().toLowerCase()));
            if(index === -1) index = database.findIndex(movie => movie.id === singleData.id);
            console.log(index)
            if(index === -1){
                res.status(404).send(failureMessage);
            }
            else{
                // if((req.cookies.username !== database[index].addedBy || req.signedCookies.username !== database[index].addedBy) || (req.signedCookies.isAdmin === 'false' || req.cookies.isAdmin==='false')){
                //     return res.status(403).send('Access denied, you can only update a movies you added')
                // }
                if((req.cookies.username !== database[index].addedBy && req.cookies.isAdmin==='false') ||  (req.signedCookies.username !== database[index].addedBy && req.signedCookies.isAdmin==='false') ) 
                    return res.status(403).send('Access denied, you can only update a movies you added')
            
                database[index] = {...database[index], ...singleData}
                fs.writeFile(databasePath, JSON.stringify(database, null, " "), 'utf-8', (err)=>{
                    if(err){
                        console.log(err);
                        res.status(400).send(failureMessage);
                        return;
                    }
                    else{
                    console.log("Data Added Successfully!");
                    res.status(201).send(successMessage);
                    }
                });
            }   
        })
        reqErrorHandler(req, res)
        }
    catch(err){
        console.error(err);
    }
}

export default updateMovie;