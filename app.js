const express = require('express')
const devenv = require("dotenv")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const errorMiddleware = require("./api/middlewares/errors")
const app = express()
const connectDatabase = require("./api/config/database")
const ErrorHandler = require("./api/exceptions/ErrorHandler")
const jobs = require("./api/routes/job.routes")
const auth = require("./api/routes/auth.routes")
devenv.config({ path: "./api/config/config.env" })

// handle uncaught exception
process.on("uncaughtException", err => {
    console.log("ERROR: ", err.message)
    process.exit(1);
})

connectDatabase();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json())

app.use("/api/v1/auth",auth)
app.use("/api/v1/jobs", jobs)

app.all("*", (req, res, next) => {
    next(new ErrorHandler(req.originalUrl + " route not found.", 404))
})

app.use(errorMiddleware)

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log('Server run on port ' + PORT + " in " + process.env.NODE_ENV + " mode")
});

// handle unhandle error
process.on("unhandledRejection", err => {

    console.log("error : ", err.message);
    console.log("Shutting down the server dur to handled promiss rejection");
    
    server.close(() => {
        process.exit(1);
    })
})