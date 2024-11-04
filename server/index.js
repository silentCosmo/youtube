import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import videoRoutes from './Routes/Video.js'
import userRoutes from './Routes/User.js'
import commentRoutes from './Routes/Comment.js'
import paymentRoutes from './Routes/Payment.js'
import path from 'path'

dotenv.config()

const app=express()
app.use(cors())
app.use(express.json({limit:"30mb",extend:true}))
app.use(express.urlencoded({limit:"30mb",extend:true}))
app.use('/uploads',express.static(path.join('uploads')))

app.get('/',(req,res)=>{
    res.send('server is up :)')
})

app.use(bodyParser.json())
app.use('/user',userRoutes)
app.use('/video',videoRoutes)
app.use('/comment',commentRoutes)
app.use('/payment',paymentRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server running on Port: ${PORT}`);
    
})

const DB_URL = process.env.DB_URL
mongoose.connect(DB_URL).then(()=>{
    console.log("MongoDB connected!");
    
}).catch((error)=>{
    console.log(error);
    
})
