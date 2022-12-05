import mongoose from 'mongoose';

const moviesSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: String,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
    addedBy: {
        type:String,
        required:true
    },
    id: {
        type:String,
        required:true
    }
});

const moviesModel = mongoose.model('movies', moviesSchema, 'movies');

export default moviesModel;
