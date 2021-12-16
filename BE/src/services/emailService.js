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
    subject: "Thông tin đặt lịch khám bệnh",
    html: `
            <h3>Xin chào ${datatSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
            <p>Thông tin đặt lịch khám bệnh: </p>
            <p><b>Thời gian: ${datatSend.time}</b></p>

            <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường dẫn để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
            <div>
            <a href=${datatSend.redirectLink} target="_blank">Click here </a>
            </div>
        `,
  })
}

module.exports = {
  sendSimpleEmail,
}
