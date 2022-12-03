import express, {Request , Response} from 'express';

const router = express.Router();
router.get('/', (req: Request, res:Response)=> {
    res.clearCookie("username")
    res.clearCookie("isAdmin")
    res.status(200).send('successfully logged out')
})

export default router;