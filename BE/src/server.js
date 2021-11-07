import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"
require('dotenv').config() //lệnh để chạy process.env

let app = express();

//config app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

connectDB()

let port = process.env.PORT || 6969 // process.env để truy cập các biến env

app.listen(port, () => {
    // Callback
    console.log("Backend Nodejs is running on the port: " + port)
})