import fs from 'fs';

const initDb = async (database?: string)=>{
    database = database || "./db/database.json";
  
    let hasDb: boolean = false;
    if(fs.existsSync(database)){
      hasDb = true;
    }
  
    if(!hasDb){
      fs.writeFile(database, JSON.stringify([], null, " "), 'utf-8', (err)=>{
        if(err){
          console.log(err)
          return;
        }
        else{
        console.log("Database Created Successfully!");
        hasDb = true
        }
      })
    }
  }

  export default initDb;