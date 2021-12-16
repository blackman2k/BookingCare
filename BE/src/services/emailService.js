require("dotenv").config()
import nodemailer from "nodemailer"

const sendSimpleEmail = async (datatSend) => {
  //create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, //true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, //generated etheareal user
      pass: process.env.EMAIL_APP_PASSWORD, //generated ethereal password
    },
  })

  let infor = await transporter.sendMail({
    from: `"Trần Hữu Cảnh" <tranhuucanh2000@gmail.com>`, //send address
    to: datatSend.reciverEmail,
    subject:
      datatSend.language === "vi"
        ? "Thông tin đặt lịch khám bệnh"
        : "Information to book a medical appointment",
    html: getBodyHTMLEmail(datatSend),
  })
}

const getBodyHTMLEmail = (datatSend) => {
  console.log(datatSend)
  let result = ""
  if (datatSend.language === "vi") {
    result = `
    <h3>Xin chào ${datatSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
    <p>Thông tin đặt lịch khám bệnh: </p>
    <p><b>Thời gian: ${datatSend.time}</b></p>
    <p><b>Bác sĩ: ${datatSend.time}</b></p>

    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường dẫn để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    <div>
    <a href=${datatSend.redirectLink} target="_blank">Click here </a>
    </div>
    <p>Xin chân thành cảm ơn!</p>
`
  }
  if (datatSend.language === "en") {
    console.log("Tieng anh:")
    result = `
    <h3>Dear ${datatSend.patientName}!</h3>
    <p>You received this email because you booked an online medical appointment</p>
    <p>Information to schedule an appointment: </p>
    <p><b>Time: ${datatSend.time}</b></p>
    <p><b>Doctor: ${datatSend.time}</b></p>

    <p>If the above information is true, please click on the link below to confirm</p>
    <div>
    <a href=${datatSend.redirectLink} target="_blank">Click here </a>
    </div>
    <p>Sincerely thank!</p>
`
  }
  return result
}
module.exports = {
  sendSimpleEmail,
}
