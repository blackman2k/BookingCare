import db from "../models/index"
import CRUDService from "../services/CRUDService"
import userService from "../services/userSerivice"

const handleLogin = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    })
  }

  let output = await userService.handleUserLogin(email, password)
  if (output.errCode === 0) {
    return res.status(200).json({
      errCode: output.errCode,
      message: output.errMessage,
      data: {
        ...output.data,
      },
      access_token: output.access_token,
    })
  } else {
    return res.status(500).json({
      errCode: output.errCode,
      message: output.errMessage,
      data: {},
    })
  }
}

const handleGetAllUsers = async (req, res) => {
  let id = req.query.id //ALL, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    })
  }
  let users = await userService.getAllUsers(id)

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    data: users,
  })
}

const handleCreateNewUser = async (req, res) => {
  const result = await userService.createNewUser(req.body)
  return res.status(200).json({
    ...result,
  })
}

const handleEditUser = async (req, res) => {
  let data = req.body
  let result = await userService.updateUserData(data)
  return res.status(200).json({
    ...result,
  })
}

const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    })
  }

  const result = await userService.deleteUser(req.body.id)
  res.status(200).json({
    ...result,
  })
}

const handleGetAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type)
    return res.status(200).json(data)
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    })
  }
}

const userController = {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  handleGetAllCode,
}

export default userController
