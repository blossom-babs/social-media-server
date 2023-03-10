import mongoose, { Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

interface UserDocument extends Document {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	profilePhoto: string;
	location: string;
	occupation?: string;
	birthday?: string;
	following?: {};

	//createdAt: number;
	role: string;
}

const UserSchema = new mongoose.Schema<UserDocument>(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 50
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 50
		},
		username: {
			type: String,
			required: true,
			unique: true,
			min: 2,
			max: 50
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: [isEmail, 'invalid email']
		},
		password: {
			type: String,
			required: true
		},
		profilePhoto: {
			type: String,
			default: ''
		},
		location: String,
		occupation: String,
		birthday: String,
		following: {
			type: Map,
			of: Boolean
		}
	},
	{ timestamps: true }
);

const FollowerSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true
		},
		following: {
			type: Map,
			of: Boolean
		}
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);
const Follower = mongoose.model('Follower', FollowerSchema);

export { User, FollowerSchema };
