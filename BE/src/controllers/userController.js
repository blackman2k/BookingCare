import db from "../models/index"
import CRUDService from "../services/CRUDService"
import userService from "../services/userSerivice"

const handleLogin = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter!"
        })
    }

    let user = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: user.errCode,
        message: user.errMessage,
        user: user.userData ? user.userData : {}
    })
}

const userController = {
    handleLogin
}

export default userController