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

export default connectDb;
