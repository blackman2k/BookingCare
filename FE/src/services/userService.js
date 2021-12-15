import { reject } from "lodash"
import axios from "../axios"

export const handleLogin = (email, password) => {
  return axios.post("/api/login", {
    email,
    password,
  })
}

export const getAllUsers = (id) => {
  return axios.get(`/api/get-all-users`, {
    params: {
      id,
    },
  })
}

export const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data)
}

export const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  })
}
export const editUserService = (data) => {
  return axios.put("/api/edit-user", data)
}

export const getAllCodeService = (type) => {
  return axios.get(`/api/all-code?type=${type}`)
}

export const getTopDoctorHomeService = (limit) => {
  return axios.get(`api/top-doctor-home?limit=${limit}`)
}
export const getAllDoctors = () => {
  return axios.get(`api/get-all-doctors`)
}
export const saveInfoDoctor = (data) => {
  return axios.post(`api/save-infor-doctor`, data)
}

export const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

export const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data)
}

export const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  )
}

export const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

export const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
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
  getProfileDoctorById,
}

export default userService
