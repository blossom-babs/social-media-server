import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, email, password, profilePhoto } = req.body
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    const newUser = new User({ firstName, lastName, username, email, password: passwordHash, profilePhoto })
    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: error })

    }
  }
}