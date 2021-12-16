import db from "../models"
require("dotenv").config()
import emailService from "./emailService"

const postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.timeType || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        })
      } else {
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: "Nguyễn Văn A",
          time: "8:00 - 9:00 Thứ Năm 16/12/2021",
          doctorName: "Nguyễn Văn B",
          redirectLink: "https://www.youtube.com",
        })

        //upsert patient
        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
          },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        })

        //create a booking record
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          })
        }

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

module.exports = {
  postBookAppointment: postBookAppointment,
}
