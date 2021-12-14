import { reject } from "lodash"
import axios from "../axios"

const handleLogin = (email, password) => {
  return axios.post("/api/login", {
    email,
    password,
  })
}

const getAllUsers = (id) => {
  return axios.get(`/api/get-all-users`, {
    params: {
      id,
    },
  })
}

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data)
}

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  })
}
const editUserService = (data) => {
  return axios.put("/api/edit-user", data)
}

const getAllCodeService = (type) => {
  return axios.get(`/api/all-code?type=${type}`)
}

const getTopDoctorHomeService = (limit) => {
  return axios.get(`api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
  return axios.get(`api/get-all-doctors`)
}
const saveInfoDoctor = (data) => {
  return axios.post(`api/save-infor-doctor`, data)
}

const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  )
}

const userService = {
  handleLogin,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveInfoDoctor,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
}

export default userService
