import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './Routes/authRoute.js'
import categoryRoutes from './Routes/categoryRoutes.js' 
import productRoutes from './Routes/productRoutes.js'
import cors from 'cors'

//dotenv config
dotenv.config();

//database config
connectDB();
//rest object
const app = express();
 
// middleware
app.use(express.json())
app.use(cors());
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);
 


//rest api
app.get('/',(req,res)=>{
    res.send({
        message : "welcome to App"
    })

})



//port



//run - listen
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.DEV_MODE} on port ${process.env.PORT}`);
})