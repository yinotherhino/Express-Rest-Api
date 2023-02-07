import mongoose, {type ConnectOptions} from 'mongoose';
import {config} from 'dotenv';

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
				return 'connected to database';
			}

			return 'error in connecting to db';
		});
		return;
	} catch (err: unknown) {
		return 'error in connection';
	}
};

export default connectDb;
