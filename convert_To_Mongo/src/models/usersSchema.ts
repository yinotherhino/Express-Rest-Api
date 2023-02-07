
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const accessSecret = process.env.ACCESS_TOKEN_SECRET!;

const usersSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	fullname: {
		type: String,
	},
    salt: {
        type:String,
        required:true
    },
    isAdmin: {
        type:Boolean,
        required:true
    }
},{timestamps:true});

usersSchema.methods.authToken = function () {
	return jwt.sign({email: this.email, isAdmin:this.isAdmin}, accessSecret, {expiresIn: '300h'}); // eslint-disable-line 
};

const usersModel = mongoose.model('users', usersSchema, 'users');

export default usersModel;
