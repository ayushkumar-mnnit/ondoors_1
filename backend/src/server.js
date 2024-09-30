

import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {connectDB} from './db/conn.js'

const port=process.env.PORT || 5000

const app=express()


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(cookieParser())


import {router} from './router/routes.js'

app.use('/api',router)


connectDB() 
.then(()=>{
    app.listen(port,()=>{
        console.log(`server started at ${port}`)   
    })
}).catch((er)=>{
    console.log('server failed to start because DB connection failed',er)
})



