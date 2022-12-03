const reqBodyCheck = (reqBody: any)=>{
    let arrOfKeys = Object.keys(reqBody);

    arrOfKeys.forEach((item)=>{
        if(reqBody[item]== '' || reqBody[item]== undefined){
            delete reqBody[item]
        }
    })
    return reqBody
}

export default reqBodyCheck;