import { reject } from "lodash";
import axios from "../axios";

const handleLogin = (email, password) => {
    // return new Promise(async (resolve, reject) => {
    //     try {
    //         const result = await axios.post('/api/login', {
    //             email,
    //             password
    //         })
    //         resolve(result)
    //     } catch (e) {
    //         reject(e)
    //     }
    // })
    return axios.post('/api/login', {
        email, password
    })
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const userService = {
    handleLogin,
    getAllUsers,
    createNewUserService,
    deleteUserService
}

export default userService