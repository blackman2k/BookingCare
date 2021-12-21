const db = require("../models")

const createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        })
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        })

        resolve({
          errCode: 0,
          errMessage: "OK",
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}
const getAllSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({})

      if (data && data.length > 0) {
        data = data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary")
          return item
        })
      }

      resolve({
        errCode: 0,
        errMessage: "OK",
        data,
      })
    } catch (error) {
      reject(error)
    }
  })
}
const getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
          data: {},
        })
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "descriptionHTML",
            "descriptionMarkdown",
            "name",
            "image",
          ],
          raw: true,
        })
        console.log("Data: ", data)

        if (data) {
          let doctorSpecialty = []
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
              raw: true,
            })
            console.log("Time tat ca: ", doctorSpecialty)
          } else {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location,
              },
              attributes: ["doctorId", "provinceId"],
              raw: true,
            })
            console.log("Time : ", doctorSpecialty)
          }
          data.doctorSpecialty = doctorSpecialty
        }
        resolve({
          errCode: 0,
          errMessage: "OK",
          data,
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}

const editSpecialty = (id, data) => {
  console.log(id, data)
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.image ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        })
      } else {
        let specialty = await db.Specialty.findOne({
          where: {
            id: id,
          },
          raw: false,
        })
        console.log("Tim ra specialty: ", specialty)
        specialty.image = data.image
        specialty.name = data.name
        specialty.descriptionHTML = data.descriptionHTML
        specialty.descriptionMarkdown = data.descriptionMarkdown

        await specialty.save()

        resolve({
          errCode: 0,
          errMessage: "OK",
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = {
  createSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  editSpecialty,
}
