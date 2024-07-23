
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRouter.js'



const app = express();
dotenv.config()
app.use(express.json())             
app.use(cookieParser())


const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.json({msg:"This is Example"})
})

app.listen(PORT,() => {
    console.log("SERVER IS RUNNING ...")
})

//Routes 
app.use('/user',userRouter)



//connect mongoDB

const URI = process.env.MONGODB_URL;


mongoose.connect(URI,{
    
}).then(()=>{
    console.log("MongoDB Connected")
}).catch(err => {
    console.log(err)
})
