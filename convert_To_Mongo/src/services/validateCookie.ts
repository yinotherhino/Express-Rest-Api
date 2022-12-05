import usersModel from '../models/mongo/usersSchema';
import { verifySignature } from './joiValidation';

const validateCookie = async(token: string)=> {
    if(token){
        const user = await verifySignature(token)
        const username = user.username;
        const userExists = await usersModel.findOne({username})
        if(userExists){
            return {isValid:true, isAdmin: userExists.isAdmin, user}
        }
    }
    return {isValid:false, isAdmin:false}
}

export default validateCookie;
