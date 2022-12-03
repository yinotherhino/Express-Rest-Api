// import fs from 'fs';
// import { Request, Response } from 'express';

// import reqErrorHandler from './reqErrorHandler';
// import { moviesObj, UserObj } from '../interfaces/typings';


// const getAllData = (databasePath: string, req:Request, res:Response) => {
//     fs.readFile(databasePath, (err, data) => {
//         if(err){
//           console.error(err);
//           return res.status(400).send("Error Occured")
//         }
//         let datas: Array<UserObj> | Array<moviesObj>= JSON.parse(data.toString());

//         if(datas instanceof Array<UserObj>){
//             datas.forEach((item, index)=> {
//                 delete item['password'];
//                 datas[index]= item;
//             })
//         }
//         res.status(200).send(datas);
//       })

//     reqErrorHandler(req, res)
// }

