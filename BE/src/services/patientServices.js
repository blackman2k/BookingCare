import db from "../models"
require("dotenv").config()
import emailService from "./emailService"
import { v4 as uuidv4 } from "uuid"
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
  return result
}

const postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        })
      } else {
        const token = uuidv4()
        console.log("Token: ", token)

        //upsert patient
        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
          },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName: data.fullName,
          },
        })

        //create a booking record
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id, timeType: data.timeType },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          })
        }

        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        })
        resolve({
          errCode: 0,
          errMessage: "Save infor patient succed!",
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}

const postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        })
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        })

        if (appointment) {
          appointment.statusId = "S2"
          await appointment.save()

          resolve({
            errCode: 0,
            errMessage: "Update the appointment succeed!",
          })
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activeted or does not exist!",
          })
        }
      }
    } catch (error) {
      reject(error)
    }
  })
}

const getSearch = (text) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!text) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        })
      } else {
        let result = {}
        let doctors = await db.User.findAll({
          where: {
            firstName: { [Op.like]: `%${text}%` },
            roleId: "R2",
          },
          attributes: ["id", "firstName", "lastName", "roleId"],
          raw: true,
        })
        // doctors = doctors.filter(item => item.roleId === 'R2')
        let clinics = await db.Clinic.findAll({
          where: {
            name: { [Op.like]: `%${text}%` },
          },
          attributes: ["id", "name"],
          raw: true,
        })

        result.doctors = doctors
        result.clinics = clinics
        resolve({
          errCode: 0,
          errMessage: "OK",
          result,
        })

        // let appointment = await db.Clinic.findAll({
        //   where: {
        //     doctorId: data.doctorId,
        //     token: data.token,
        //     statusId: "S1",
        //   },
        //   raw: false,
        // })

        // if (appointment) {
        //   appointment.statusId = "S2"
        //   await appointment.save()

        // } else {
        //   resolve({
        //     errCode: 2,
        //     errMessage: "Appointment has been activeted or does not exist!",
        //   })
        // }
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
  getSearch,
}
