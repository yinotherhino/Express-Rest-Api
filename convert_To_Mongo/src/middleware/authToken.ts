import {type Response, type NextFunction} from 'express';
import jwt, {type JwtPayload} from 'jsonwebtoken';

export const authToken = (req: JwtPayload, res: Response, next: NextFunction): any => {
	try {
		const authHeader = String(req.cookies.token);
		const token = req.cookies.token as string;
		if (!token) {
			return res.status(401).json({Error:"Unauthorized"});
		}

		const accessToken = process.env.ACCESS_TOKEN_SECRET!;

		jwt.verify(token, accessToken, (err: any, decoded): any => {
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

export const frontendAuthToken = (req: JwtPayload, res: Response, next: NextFunction): any => {
	try {
		const authHeader = String(req.cookies.token);
		const token = req.cookies.token;
		if (!token) {
			return res.sendStatus(401).redirect('/signin');
		}

		const accessToken = process.env.ACCESS_TOKEN_SECRET!;

		jwt.verify(token, accessToken, (err: any, decoded): any => {
			if (err) {
				res.status(401).redirect('/signin');
				return;
			}

			req.user = decoded;

			next();
		});
	} catch (err: unknown) {
		// res.status(401).redirect('/login');
        res.status(500).redirect('/signin');
	}
};
