import {type Response, type NextFunction} from 'express';
import jwt, {type JwtPayload} from 'jsonwebtoken';
import { verifySignature } from '../services/joiValidation';
import validateCookie from '../services/validateCookie';

export const authToken = async (req: JwtPayload, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		
		if (!authHeader) {
			return res.status(401).json({Error:"Unauthorized"});
		}
		const token = authHeader.split(" ")[1];
		const accessToken = process.env.APP_SECRET!;

		jwt.verify(token, accessToken, (err: any, decoded:any): any => {
			if (err) {
				return res.status(401).json({Error:"Unauthorized"});
			}

			req.user = decoded;

			next();
		});
	} catch (err: unknown) {
		// res.status(401).redirect('/login');
        res.status(500).json({Error:"Server error"});
	}
};



export const frontendAuthToken = async (req: JwtPayload, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.token;
		console.log(req.url)
		if(!token && req.url==="/"){
			res.status(200).redirect("/signin")
			return;
		}
		if (token) {
			const {isValid} = (await validateCookie(token))
			if(isValid){
				const decoded = await verifySignature(token)
				if(decoded){
					req.user = decoded;
					req.headers.authorization = token;
					next();
					return;
				}
			}
		}
		
		return res.status(401).redirect('/sigin?err=invalid+cookie')
	} catch (err: unknown) {
        return res.status(500).redirect('/signin?err=server+error');
	}
};
