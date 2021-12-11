import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"

require("dotenv").config() //lệnh để chạy process.env

let app = express()

const cors = require("cors")
app.use(
  cors({
    origin: true,
  })
)
//config app

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

viewEngine(app)
initWebRoutes(app)

connectDB()

let port = process.env.PORT || 6969 // process.env để truy cập các biến env

app.listen(port, () => {
  // Callback
  console.log("Backend Nodejs is running on the port: " + port)
})
