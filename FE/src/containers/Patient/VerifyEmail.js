import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import { postVerifyBookingAppointment } from "../../services/userService"
import styles from "./VerifyEmail.module.scss"
import { divide } from "lodash"

export class VerifyEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusVerify: false,
      errCode: 0,
    }
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search)
      let token = urlParams.get("token")
      let doctorId = urlParams.get("doctorId")
      let res = await postVerifyBookingAppointment({
        token: token,
        doctorId: doctorId,
      })

      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        })
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        })
      }
    }
  }

  render() {
    const { statusVerify, errCode } = this.state
    return (
      <>
        <div className={styles.verifyEmailContainer}>
          {statusVerify === false ? (
            <div>Loading data...</div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className={styles.inforBooking}>
                  Xác nhận lịch hẹn thành công!
                </div>
              ) : (
                <div className={styles.inforBooking}>
                  Lịch hẹn không tồn tại hoặc đã được xác nhận!
                </div>
              )}
            </div>
          )}
        </div>
      </>
    )
    return <div></div>
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
