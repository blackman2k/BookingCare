import { reject } from "lodash";
import axios from "../axios";

const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post('/api/login', {
                email,
                password
            })
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}

const userService = {
    handleLogin
}

export default userService