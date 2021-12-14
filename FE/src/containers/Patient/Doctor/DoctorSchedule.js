import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./DoctorSchedule.module.scss"
import moment from "moment"
import localization from "moment/locale/vi"
import { LANGUAGES } from "../../../utils"
import userService from "../../../services/userService"
import { divide } from "lodash"

export class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allDays: [],
    }
  }

  async componentDidMount() {
    const { language } = this.props
    this.setArrDays(language)
  }

  setArrDays = (language) => {
    let allDays = []
    for (let i = 0; i < 7; i++) {
      let object = {}
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM")
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
    }
  }

  render() {
    const { allDays } = this.state

    return (
      <div className={styles.doctorScheduleContainer}>
        <div className={styles.allSchedule}>
          <select onChange={(event) => this.handleOnChangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                )
              })}
          </select>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
