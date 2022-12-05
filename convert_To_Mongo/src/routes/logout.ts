import express, {Response} from 'express';
import {JwtPayload} from 'jsonwebtoken';

const router = express.Router();
router.get('/', (req: JwtPayload, res:Response)=> {
    req.user = {};
    res.clearCookie("username");
    res.clearCookie("isAdmin");
    res.status(200).redirect('/');
})

export default router;
