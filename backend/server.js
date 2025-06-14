import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import developersRouter from './routes/devRoute.js'
import userRouter from './routes/userRoutes.js'


// app config 
const app = express()
const port = process.env.Port || 4000

// middlewares
app.use(express.json())
app.use(cors())

// DB & Cloudinary
connectDB()
connectCloudinary()

//api endpoint 
app.use('/api/admin',adminRouter)
app.use('/api/developers',developersRouter)
app.use('/api/users',userRouter)
app.use(cors({
  origin: [
    "https://devhire-panel.vercel.app",
    "https://devhire-admin.vercel.app"
  ],
  credentials: true
}));
//localhost:6969/api/admin/add-developers

app.get('/', (req, res) => {
    res.send('API WORKING GREAT')
})

app.listen(port, () => {
    console.log(`Server Running in port ${port}`);
})