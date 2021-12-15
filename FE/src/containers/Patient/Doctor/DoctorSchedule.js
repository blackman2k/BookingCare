import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./DoctorSchedule.module.scss"
import moment from "moment"
import localization from "moment/locale/vi"
import { LANGUAGES } from "../../../utils"
import userService from "../../../services/userService"
import { divide } from "lodash"
import { Button, Form } from "react-bootstrap"
import { FormattedMessage } from "react-intl"
import BookingModal from "./Modal/BookingModal"

export class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDays: [],
      allAvalableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    }
  }

  async componentDidMount() {
    const { language } = this.props
    let allDays = this.getArrDays(language)
    this.setState({
      allDays: allDays,
    })
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  getArrDays = (language) => {
    let allDays = []
    for (let i = 0; i < 7; i++) {
      let object = {}
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM")
          let today = `Hôm nay - ${ddMM}`
          object.label = today
        } else {
          let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM")
          object.label = this.capitalizeFirstLetter(labelVi)
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM")
          let today = `Today - ${ddMM}`
          object.label = today
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM")
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf()
      allDays.push(object)
    }

    return allDays
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language)
      this.setState({
        allDays: allDays,
      })
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays(this.props.language)
      let res = await userService.getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      )
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      })
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent
      let date = event.target.value
      let res = await userService.getScheduleDoctorByDate(doctorId, date)
      console.log("Check respon schedule: ", res)
      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTime: res.data ? res.data : [],
        })
      }
    }
  }

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    })
  }

  closeBookingClose = () => {
    this.setState({
      isOpenModalBooking: false,
    })
  }

  render() {
    const {
      allDays,
      allAvalableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state
    const { language } = this.props

    return (
      <>
        <Form.Select
          onChange={(event) => this.handleOnChangeSelect(event)}
          className={styles.selectTime}
        >
          {allDays &&
            allDays.length > 0 &&
            allDays.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              )
            })}
        </Form.Select>
        <p className={styles.titleCalendar}>
          <i className="fas fa-calendar"></i>
          <span>
            <FormattedMessage id="patient.detail-doctor.schedule" />
          </span>
        </p>
        <div className={styles.scheduleContainer}>
          {allAvalableTime && allAvalableTime.length > 0 ? (
            <>
              {allAvalableTime.map((item, index) => {
                {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn
                  return (
                    <Button
                      variant="warning"
                      key={index}
                      onClick={() => this.handleClickScheduleTime(item)}
                    >
                      {timeDisplay}
                    </Button>
                  )
                }
              })}
            </>
          ) : (
            <p>
              <FormattedMessage id="patient.detail-doctor.no-schedule" />
            </p>
          )}
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingClose={this.closeBookingClose}
          dataTime={dataScheduleTimeModal}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
