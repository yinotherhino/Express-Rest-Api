import usersModel from '../models/usersSchema';
import { verifySignature } from './joiValidation';

const validateCookie = async(token: string)=> {
        const user = await verifySignature(token)
        const username = user.username;
        const userExists = await usersModel.findOne({username})
        if(userExists){
            return {isValid:true, isAdmin: userExists.isAdmin, user}
        }
    return {isValid:false, isAdmin:false}
}

export default validateCookie;
