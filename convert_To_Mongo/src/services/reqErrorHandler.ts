import { Request, Response, NextFunction } from "express";

const reqErrorHandler= (req:Request, res:Response, next?: NextFunction)=>{
    req.on('error', (err)=>{
        console.error(`An error Occured: ${err}`)
        res.status(400).send('An unknown error Occured')
    })
    res.on('error', (err)=>{
        console.error(`An error Occured: ${err}`)
        res.status(500).send('An unknown error Occured')
    })

}

export default reqErrorHandler;