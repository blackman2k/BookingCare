import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController"
import clinicControler from "../controllers/clinicController"

const router = express.Router()

const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage)
  router.get("/thc", homeController.getAboutPage)
  router.get("/crud", homeController.getCRUD)

  router.post("/post-crud", homeController.postCRUD)
  router.get("/get-crud", homeController.displayGetCRUD)
  router.get("/edit-crud", homeController.getEditCRUD)

  router.post("/put-crud", homeController.putCRUD)
  router.get("/delete-crud", homeController.deleteCRUD)

  router.post("/api/login", userController.handleLogin)
  router.get("/api/get-all-users", userController.handleGetAllUsers)
  router.post("/api/create-new-user", userController.handleCreateNewUser)
  router.put("/api/edit-user", userController.handleEditUser)
  router.delete("/api/delete-user", userController.handleDeleteUser)

  router.get("/api/all-code", userController.handleGetAllCode)

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome)
  router.get("/api/doctors", doctorController.getAllDoctors)
  router.post("/api/doctors", doctorController.postInforDoctor)
  router.get("/api/doctors", doctorController.getDetailDoctorById)
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule)
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  )
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    doctorController.getExtraIntforDoctorById
  )
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  )
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  )
  router.post("/api/send-remedy", doctorController.sendRemedy)

  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  )
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  )
  router.get("/api/search", patientController.getSearch)

  router.post("/api/specialtys", specialtyController.createSpecialty)
  router.put("/api/specialtys", specialtyController.editSpecialty)
  router.get("/api/specialtys", specialtyController.getAllSpecialty)
  router.get("/api/specialtys", specialtyController.getDetailSpecialtyById)

  router.post("/api/clinics", clinicControler.createClinic)
  router.get("/api/clinics", clinicControler.getAllClinic)
  router.put("/api/clinics", clinicControler.editClinic)
  router.get("/api/clinics", clinicControler.getDetailClinicById)

  return app.use("/", router)
}

export default initWebRoutes
