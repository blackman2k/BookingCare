import db from "../models"
import userService from "./userSerivice"
require("dotenv").config()
import _, { reject } from "lodash"

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

let getTopDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      })
      resolve({
        errCode: 0,
        data: users,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: {
          roleId: "R2",
        },
        attributes: {
          exclude: ["password", "image"],
        },
      })

      resolve({
        errCode: 0,
        doctors,
      })
    } catch (e) {
      reject(e)
    }
  })
}

const saveDetailInforDoctor = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        })
      } else {
        let markdownUser = await db.Markdown.findOne({
          where: {
            doctorId: data.doctorId,
          },
          raw: false,
        })
        if (markdownUser) {
          console.log("Da co du lieu", markdownUser)
          markdownUser.contentHTML = data.contentHTML
          markdownUser.contentMarkdown = data.contentMarkdown
          markdownUser.description = data.description
          markdownUser.doctorId = data.doctorId
          await markdownUser.save()
        } else {
          await db.Markdown.create({
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
            description: data.description,
            doctorId: data.doctorId,
          })
        }

        resolve({
          errCode: 0,
          errMessage: "Save information success",
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}

const getDetailDoctorById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters ",
        })
      } else {
        console.log("vao else")
        let data = await db.User.findOne({
          where: {
            id: id,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        })

        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary")
        }

        if (!data) data = {}

        resolve({
          errCode: 0,
          data: data,
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}

const bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
        resolve({
          errCode: -1,
          errMessage: "Missing required parameters!",
        })
      } else {
        let schedule = data.arrSchedule
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE
            return item
          })
        }

        let existing = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: data.formatedDate },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        })

        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            item.date = new Date(item.date).getTime()
            return item
          })
        }

        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && a.date === b.date
        })

        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate)
        }

        resolve({
          errCode: 0,
          errMessage: "OK",
        })
      }
    } catch (error) {
      reject(e)
    }
  })
}

module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  saveDetailInforDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
}
