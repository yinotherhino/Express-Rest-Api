import {type Response, type NextFunction} from 'express';
import jwt, {type JwtPayload} from 'jsonwebtoken';

export const authToken = (req: JwtPayload, res: Response, next: NextFunction): any => {
	try {
		const authHeader = String(req.cookies.token);
		const token = req.cookies.token as string;
		if (token === null) {
			return res.sendStatus(401).redirect('/signin');
		}

		const accessToken = process.env.ACCESS_TOKEN_SECRET!;

		jwt.verify(token, accessToken, (err: any, decoded): any => {
			if (err) {
				res.status(401).redirect('/login');
				return;
			}

			req.user = decoded;

			next();
		});
	} catch (err: unknown) {
		res.status(401).redirect('/login');
	}
};
