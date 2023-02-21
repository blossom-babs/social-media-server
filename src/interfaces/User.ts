import { Document } from "mongoose";

interface UserDocument extends Document {
  id: number;
  name: string;
  email: string;
  createdAt: number;
  role: string;
  
}