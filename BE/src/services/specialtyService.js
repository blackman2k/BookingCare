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
        console.log("inputID", inputId, "--", location)
        let data = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
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

        console.log("Data truyen: ", data)
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

module.exports = {
  createSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
}
