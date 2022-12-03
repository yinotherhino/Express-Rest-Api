import fs from 'fs/promises';
import { UserObj } from '../interfaces/typings';

const validateCookie = async(username: string, database?: Array<UserObj> )=> {
    if(!database){
        let databaseFile = await fs.readFile('./db/usersDb.json');
        let database: Array<UserObj> = JSON.parse(databaseFile.toString());
        const index = database.findIndex(data => data.username === username);
        if(index !== -1) return {isValid:true, isAdmin: database[index].isAdmin}
        return {isValid:false, isAdmin:false}
    }
    else{
        const index = database.findIndex(data => data.username === username);
        if(index !== -1) return {isValid:true, isAdmin: database[index].isAdmin}
        return {isValid:false, isAdmin:false}
    }
}

export default validateCookie