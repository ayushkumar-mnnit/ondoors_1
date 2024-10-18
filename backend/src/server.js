

import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {connectDB} from './db/conn.js'

const port=process.env.PORT || 5000

const app=express()

const api='https://ondoors-1.onrender.com'  // hosted backend url

app.use(cors({
    origin:process.env.CORS_ORIGIN || 'https://ondoors-frontend.onrender.com' ,  // hosted frontend url
    credentials:true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(cookieParser())


import {router} from './router/routes.js'

app.use(api,router)

// for confirmation of backend running or not
app.get('/health', (req, res) => {
    res.status(200).send('Backend is running!');
  });
  

connectDB() 
.then(()=>{
    app.listen(port,()=>{
        console.log(`server started at ${port}`)   
    })
}).catch((er)=>{
    console.log('server failed to start because DB connection failed',er)
})


