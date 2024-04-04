
require('dotenv').config()
const express= require('express')
const app=express()
const port=5000

const connectDB = require('../db/conn')


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



