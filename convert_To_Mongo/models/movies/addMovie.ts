import fs from 'fs';
import { Request, Response } from 'express';
import { moviesObj } from '../../interfaces/typings';
import reqErrorHandler from '../../services/reqErrorHandler';
import validateCookie from '../../services/validateCookie';


const addMovie = async (databasePath: string, singleData: moviesObj, req :Request, res: Response, successMessage: string, failureMessage:string) =>{
    try{
    let database: Array<moviesObj> = [];
        if(!req.signedCookies.username){
            return res.status(403).send("Only logged in users can add a movie.")
        }
        fs.readFile(databasePath, (err, data) => {
            if(err) return console.error(err);
            database= JSON.parse(data.toString());
            singleData.addedBy = req.signedCookies.username;
            singleData.id = database.length? database[database.length -1].id +1 : 1;
            database.push(singleData);
            fs.writeFile(databasePath, JSON.stringify(database, null, " "), 'utf-8', (err)=>{
                if(err){
                    console.log(err);
                    res.send(failureMessage);
                    return;
                }
                else{
                console.log("Data Added Successfully!");
                res.status(201).send(successMessage);
                }
        });
    })
    reqErrorHandler(req, res)
    }
    catch(err){
        console.error(err);
    }
}

export default addMovie;
