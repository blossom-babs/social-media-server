import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request, Response } from 'express';


// register user
export const register = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, username, email, password, profilePhoto } =
			req.body;
		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);
		const newUser = new User({
			firstName,
			lastName,
			username,
			email,
			password: passwordHash,
			profilePhoto,
			location: '',
			occupation: '',
			birthday: '',
			following: {},
			followers: {}
		});
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		} else {
			res.status(500).json({ message: error });
		}
	}
};

// login
export const login = async (req: Request, res: Response) => {
	let isMatch;

	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			return res.status(400).json({ message: 'User does not exist' });
		} else {
			isMatch = await bcrypt.compare(req.body.password, user.password);
		}
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid password' });
		}

		const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET || '');
    const {password, ...userDetails} = user.toObject()
    return res.status(201).json({token, userDetails})
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		} else {
			res.status(500).json({ message: error });
		}
	}
};
