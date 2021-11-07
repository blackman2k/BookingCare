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

    let output = await userService.handleUserLogin(email, password);
    if (output.errCode === 0) {
        return res.status(200).json({
            errCode: output.errCode,
            message: output.errMessage,
            data: {
                ...output.data
            }
        })
    } else {
        return res.status(500).json({
            errCode: output.errCode,
            message: output.errMessage,
            data: {}
        })
    }
}

const userController = {
    handleLogin
}

export default userController