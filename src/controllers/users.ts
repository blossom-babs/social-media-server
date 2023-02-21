import { Request, Response } from 'express';
import {User} from '../models/User';

export const getUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
    const user = await User.findById(id)
    res.status(200).json(user)
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		} else {
			res.status(500).json({ message: error });
		}
	}
};
