import express from 'express';
import cors  from 'cors';
import { config }  from 'dotenv';

import mongoose, {type ConnectOptions} from 'mongoose';
import { writeToDb } from './models/restaurantModel';


const app = express();

config();
const uri = String(process.env.URI);

const connectDb = async () => {
	try {
		mongoose.connect(uri, {
			autoIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions, (err: any) => {
			if (!err) {
				return 'connected';
			}

			return 'error in connection';
		});
		return;
	} catch (err: unknown) {
		console.error(err);
		return 'error in connection';
	}
};


// import connectDb from '../src/models/'

connectDb()
    .then(() => {
        console.log('Connected to DB');
        writeToDb();
    })
    .catch(err => {
        console.log(err);
    });


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send({
    title: 'hello world',
  });
});

const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`listening to port ${port}`));