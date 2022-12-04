import mongoose from 'mongoose';
import fs from 'fs';
import path, { dirname } from 'path';
const dbPath = path.join(process.cwd(), 'restaurant.json')

const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
  address: {
    type: Map
  },
  borough: {
    type: String,
    trim: true,
  },
  cuisine: {
    type: String,
    trim: true,
  },  
  grades: {
    type: Array,
    of: Map,
  },
  name: {
    type: String,
    trim: true,
  },
  restaurant_id: {
    type: String,
    trim: true,
  },
})



export const writeToDb = async () => {
    try {
        const db = fs.createReadStream(dbPath, 'utf-8');
        db.on('data', async (chunk)=>{
            await Restaurant.create(chunk)
        });
        db.on('end', ()=>{
            console.log('data successfully imported')
            process.exit()
        })
        db.on('error', (err)=>{
            console.log(err)
        })
      // to exit the process
    } catch (error) {
      console.log('error', error)
    }
};

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

export default Restaurant