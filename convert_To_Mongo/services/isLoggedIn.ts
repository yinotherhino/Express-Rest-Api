import { Request, Response, NextFunction } from "express";

const isLoggedIn = (req:Request, res:Response, next:NextFunction) => {
    if(req.signedCookies){
        
    }
}

export default isLoggedIn;