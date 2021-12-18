import doctorService from "../services/doctorService"

const getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit
  if (!limit) limit = 10

  try {
    let response = await doctorService.getTopDoctorHome(+limit)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    })
  }
}

const getAllDoctors = async (req, res) => {
  try {
    let result = await doctorService.getAllDoctors()
    return res.status(200).json(result)
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}

const postInforDoctor = async (req, res) => {
  try {
    let result = await doctorService.saveDetailInforDoctor(req.body)
    return res.status(200).json(result)
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}

const getDetailDoctorById = async (req, res) => {
  try {
    let result = await doctorService.getDetailDoctorById(req.query.id)
    return res.status(200).json(result)
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}

const bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await doctorService.bulkCreateSchedule(req.body)
    return res.status(200).json(infor)
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}

const getScheduleByDate = async (req, res) => {
  try {
    let infor = await doctorService.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    )
    return res.status(200).json(infor)
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}

const getExtraIntforDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getExtraIntforDoctorById(req.query.doctorId)
    return res.status(200).json(infor)
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}
const getProfileDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getProfileDoctorById(req.query.doctorId)
    return res.status(200).json(infor)
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}
const getListPatientForDoctor = async (req, res) => {
  try {
    let infor = await doctorService.getListPatientForDoctor(
      req.query.doctorId,
      req.query.date
    )
    return res.status(200).json(infor)
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}

module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  postInforDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraIntforDoctorById,
  getProfileDoctorById,
  getListPatientForDoctor,
}
