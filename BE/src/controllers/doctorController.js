import doctorService from "../services/doctorService"

const getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit
  if (!limit) limit = 10

  try {
    let response = await doctorService.getTopDoctorHome(+limit)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    })
  }
}

const getAllDoctors = async (req, res) => {
  try {
    let result = await doctorService.getAllDoctors()
    console.log(result)
    return res.status(200).json(result)
  } catch (e) {
    console.log(e)
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

module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  postInforDoctor,
}
