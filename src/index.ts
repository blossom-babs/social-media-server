import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; // for file uploads
import helmet from "helmet"; // for securing HTTP headers
import morgan from "morgan"; // node and express middleware to log HTTP requests and errors
import path from "path";
import { register } from "./controllers/auth";
import authRoutes from "./routers/auth";

// CONFIGURATION
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// FILE STORAGE

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

// ROUTES WITH FILES

app.post("/auth/register", upload.single("picture"), register)

// ROUTES

app.use("/auth", authRoutes) 

// DB CONNECTION
const PORT = process.env.PORT || 6001
const uri = process.env.MONGO_URL || ""

mongoose.set('strictQuery', true)
mongoose.connect(uri).then(() => {
  app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`))
}).catch((error) => {
  console.log(error)
})