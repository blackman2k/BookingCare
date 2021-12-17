import clinicService from "../services/clinicService"

const createClinic = async (req, res) => {
  try {
    let infor = await clinicService.createClinic(req.body)
    return res.status(200).json(infor)
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}

const getAllSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.getAllSpecialty()
    return res.status(200).json(infor)
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    })
  }
}
const getDetailSpecialtyById = async (req, res) => {
  try {
    let infor = await specialtyService.getDetailSpecialtyById(
      req.query.id,
      req.query.location
    )
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
  createClinic,
  getAllSpecialty,
  getDetailSpecialtyById,
}
