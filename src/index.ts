import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; // for file uploads
import helmet from "helmet"; // for securing HTTP headers
import morgan from "morgan"; // node and express middleware to log HTTP requests and errors
import path from "path";
import { fileURLToPath } from "url";

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))