const express = require ("express");
const cors = require("cors");
const morgan = require("morgan")
const dotenv = require("dotenv")
const User = require('./router/userroute')
const connectDatabase =require("./database/conn.js")
const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); //less hackers know about this
dotenv.config({path : ".env"})
connectDatabase();
    app.listen(process.env.PORT,()=>{
            console.log(`server is running on port ${process.env.PORT}`)})
   

app.use("/api",User);

