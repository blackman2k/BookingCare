import bcrypt from "bcryptjs"
import db from "../models/index"

const salt = bcrypt.genSaltSync(10) //công thức hash

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordFromBcrypt = await hashUserPassword(data.password)
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      })

      resolve("create a new user succeed")
    } catch (e) {
      reject(e)
    }
  })
}

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt)
      resolve(hashPassword)
    } catch (e) {
      reject(e)
    }
  })
}

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = db.User.findAll({
        raw: true,
      })
      resolve(users)
    } catch (e) {
      reject(e)
    }
  })
}

const getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: userId,
        },
        raw: true,
      })

      if (user) {
        resolve(user)
      } else {
        resolve({})
      }
    } catch (e) {
      reject(e)
    }
  })
}

const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data.id },
      })

      if (user) {
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.address = data.address

        await user.save()

        const allUsers = await db.User.findAll()
        resolve(allUsers)
      }
    } catch (e) {
      reject()
    }
  })
}

const deleleUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      })

      if (user) {
        await user.destroy()
      }

      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

const CRUDService = {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleleUserById,
}

export default CRUDService
