import express from "express"

const configViewEngine = (app) => {
    app.use(express.static("./src/public")) //cấu hình đường link public
    app.set("view engine", "ejs") //cấu hình view engine
    app.set("views", "./src/views")
}

export default configViewEngine