import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./DoctorSchedule.module.scss"
import moment from "moment"
import localization from "moment/locale/vi"
import { LANGUAGES } from "../../../utils"
import userService from "../../../services/userService"
import { divide } from "lodash"
import { Button, Form } from "react-bootstrap"

export class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDays: [],
      allAvalableTime: [],
    }
  }

  async componentDidMount() {
    const { language } = this.props
    this.setArrDays(language)
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  setArrDays = (language) => {
    let allDays = []
    for (let i = 0; i < 7; i++) {
      let object = {}
      if (language === LANGUAGES.VI) {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM")
        object.label = this.capitalizeFirstLetter(labelVi)
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM")
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf()
      allDays.push(object)
    }
    this.setState({
      allDays: allDays,
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
      this.setArrDays(this.props.language)
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

  render() {
    const { allDays, allAvalableTime } = this.state
    const { language } = this.props

    return (
      <div className={styles.doctorScheduleContainer}>
        <div className={styles.allSchedule}>
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
            <i class="fas fa-calendar"></i>
            LỊCH KHÁM
          </p>
          <div className={styles.scheduleContainer}>
            {allAvalableTime && allAvalableTime.length > 0 ? (
              allAvalableTime.map((item, index) => {
                {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn
                  return (
                    <Button variant="warning" key={index}>
                      {timeDisplay}
                    </Button>
                  )
                }
              })
            ) : (
              <p>
                Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian
                khác
              </p>
            )}
          </div>
        </div>
        <div className={styles.addressContainer}></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
