const db = require("../models")

const createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.address ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        })
      } else {
        await db.Clinic.create({
          name: data.name,
          image: data.imageBase64,
          address: data.address,
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
const getAllClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({})

      if (data && data.length > 0) {
        data = data.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary")
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
const getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
          data: {},
        })
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
            "image",
          ],
          raw: true,
        })
        console.log("Data: ", data)

        if (data) {
          let doctorClinic = []
          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
            raw: true,
          })
          data.doctorClinic = doctorClinic
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

const editClinic = (id, data) => {
  console.log("Id: ", id)
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.image ||
        !data.address ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        })
      } else {
        let clinic = await db.Clinic.findOne({
          where: {
            id: id,
          },
          raw: false,
        })
        if (clinic) {
          console.log("Clinic: ", clinic)
          clinic.name = data.name
          clinic.image = data.imageBase64
          clinic.address = data.address
          clinic.descriptionHTML = data.descriptionHTML
          clinic.descriptionMarkdown = data.descriptionMarkdown

          await clinic.save()
        }

        // await db.Clinic.create({
        //   name: data.name,
        //   image: data.imageBase64,
        //   address: data.address,
        //   descriptionHTML: data.descriptionHTML,
        //   descriptionMarkdown: data.descriptionMarkdown,
        // })

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
  createClinic,
  getAllClinic,
  getDetailClinicById,
  editClinic,
}
