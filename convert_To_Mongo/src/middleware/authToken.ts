import {type Response, type NextFunction} from 'express';
import jwt, {type JwtPayload} from 'jsonwebtoken';
import validateCookie from '../services/validateCookie';

export const authToken = (req: JwtPayload, res: Response, next: NextFunction): any => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({Error:"Unauthorized"});
		}

		const accessToken = process.env.ACCESS_TOKEN_SECRET!;

		jwt.verify(authHeader, accessToken, (err: any, decoded:any): any => {
			if (err) {
				res.status(401).json({Error:"Unauthorized"});
				return;
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

		if (!token) {
			return res.status(401).redirect('/signin');
		}

        let { isValid, user } = await validateCookie(token)
        if(!isValid){
            return res.status(401).redirect('/signin')
        }
		const accessToken = process.env.ACCESS_TOKEN_SECRET!;

		jwt.verify(token, accessToken, (err: any, decoded:any): any => {
			if (err) {
				res.status(401).redirect('/signin');
				return;
			}
			req.user = decoded;
            req.headers.authorization = token;

			next();
		});
	} catch (err: unknown) {
		// res.status(401).redirect('/login');
        return res.status(500).redirect('/signin');
	}
};
