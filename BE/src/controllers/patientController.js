import patientService from "../services/patientServices"

const postBookAppointment = async (req, res) => {
  try {
    let infor = await patientService.postBookAppointment(req.body)
    return res.status(200).json(infor)
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}
const postVerifyBookAppointment = async (req, res) => {
  try {
    console.log(req.body)
    let infor = await patientService.postVerifyBookAppointment(req.body)
    return res.status(200).json(infor)
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}
const getSearch = async (req, res) => {
  try {
    console.log(req.query)
    let infor = await patientService.getSearch(req.query.text)
    return res.status(200).json(infor)
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}


module.exports = {
  postBookAppointment,
  postVerifyBookAppointment,
  getSearch
}
