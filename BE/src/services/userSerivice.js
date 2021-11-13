import bcrypt from "bcryptjs"
import { raw } from "body-parser"
import db from "../models/index"


const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userResult = await findUserByEmail(email)
            const output = {
                data: {}
            }

            if (userResult) {
                const checkPassword = await bcrypt.compareSync(password, userResult.password)
                if (checkPassword) {
                    output.errCode = 0
                    output.errMessage = 'OK'
                    output.data = {
                        email: userResult.email,
                        roleId: userResult.roleId
                    }
                } else {
                    output.errCode = 2
                    output.errMessage = 'Wrong password'
                }
            } else {
                output.errCode = 3
                output.errMessage = `You's email isn't exist in your system. Please try other email!`
            }

            resolve(output)
        } catch (e) {
            reject(e)
        }

    })
}

const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}
const findUserByEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { email: userEmail },
                raw: true
            })
            if (user) {
                resolve(user)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUsers = (userID) => {
    return new Promise(async (resole, reject) => {
        console.log("userID: ", userID)
        try {
            let users = ''
            if (userID === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userID && userID !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userID },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            console.log("User: ", users)
            resole(users)
        } catch (e) {
            reject(e)
        }
    })
}

const userService = {
    handleUserLogin,
    checkUserEmail,
    getAllUsers
}

export default userService