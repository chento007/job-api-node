const express = require('express')
const jobs = require("./api/routes/job.routes")
const devenv = require("dotenv")
const bodyParser = require("body-parser");

const app = express()
const connectDatabase = require("./api/config/database")

devenv.config({path:"./api/config/config.env"})

connectDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jobs)
app.use(express.json())

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log('Server run on port '+PORT +" in "+process.env.NODE_ENV+" mode")
})