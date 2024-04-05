
require('dotenv').config()
const express= require('express')
const app=express()
const cors=require('cors')
const port=5000

const connectDB = require('../db/conn')

// handling cors policy:

 
const corsOptions = {
    origin: 'http://localhost:3000',
   methods:'GET,POST,PATCH,DELETE,HEAD',
   Credentials:true
  }

  app.use(cors(corsOptions))

const routers=require('../router/routes')


app.use(express.json())  // middleware: for pasrsing incoming json request

app.use(routers)


connectDB()  // for seting-up database connection, here also we can handle promise and run the server iff connection to DB is successful
.then(()=>{
    app.listen(port,()=>{
        console.log(`server started at ${port}`)   
    })
}).catch((er)=>{
    console.log(er)
})



