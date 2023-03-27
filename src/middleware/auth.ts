import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
  try {
    let token = req.header("Authorization");

    if(!token) return res.status(403).send("Access Denied")
    if(token.startsWith("Bearer ")){
      token = token.split(' ')[1]
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET || " ")
    req.user = verified
    next()
  } catch (error) {
    if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		} else {
      console.log(error)
			res.status(500).json({ message: error });
		}
  }
}