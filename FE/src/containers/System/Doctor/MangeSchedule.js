import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./ManageSchedule.module.scss"
import { FormattedMessage } from "react-intl"
import Select from "react-select"
import * as actions from "../../../store/actions"
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils"
import { DatePicker } from "../../../components/Input/"
import moment from "moment"
import { Button, Col, Form, Row } from "react-bootstrap"
import clsx from "clsx"
import { toast } from "react-toastify"
import _ from "lodash"
import userService from "../../../services/userService"

export class MangeSchedule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    }
  }

  componentDidMount() {
    this.props.fetchAllDoctors()
    this.props.fetchAllScheduleTime()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allDoctors != this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
      this.setState({
        allDoctors: dataSelect,
      })
    }
    if (prevProps.allScheduleTime != this.props.allScheduleTime) {
      let data = this.props.allScheduleTime
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }))
      }

      this.setState({
        rangeTime: data,
      })
    }
  }

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected
        return item
      })
      this.setState({
        rangeTime: rangeTime,
      })
    }
  }

  handleSaveShedult = async () => {
    const { rangeTime, selectedDoctor, currentDate } = this.state
    let result = []

    if (!currentDate) {
      toast.error("Invalid date!")
      return
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor!")
      return
    }

    let formatedDate = new Date(currentDate).getTime()

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true)
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.forEach((schedule, index) => {
          let object = {}
          object.doctorId = selectedDoctor.value
          object.date = formatedDate
          object.timeType = schedule.keyMap
          result.push(object)
        })
      } else {
        toast.error("Invalid selected time!")
        return
      }
    }
    let res = await userService.saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate,
    })

    console.log("Result: ", result)
  }

  buildDataInputSelect = (inputData) => {
    let result = []
    let { language } = this.props
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {}
        let labelVi = `${item.lastName} ${item.firstName}`
        let labelEn = `${item.firstName} ${item.lastName}`
        object.label = language === LANGUAGES.VI ? labelVi : labelEn
        object.value = item.id
        result.push(object)
      })
    }

    return result
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption })
  }
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    })
  }

  render() {
    const { rangeTime } = this.state
    const { language } = this.props
    return (
      <div className="container">
        <h2 className="text-center mt-3">
          <FormattedMessage id="manage-schedule.title" />
        </h2>
        <Row>
          <Col>
            <Form.Label>
              <FormattedMessage id="manage-schedule.choose-doctor" />
            </Form.Label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.allDoctors}
              className={styles.selectDoctor}
            />
          </Col>
          <Col>
            <Form.Label>
              <FormattedMessage id="manage-schedule.choose-date" />
            </Form.Label>
            <DatePicker
              onChange={this.handleOnChangeDatePicker}
              className="form-control"
              value={this.state.currentDate}
              minDate={new Date()}
            />
          </Col>
        </Row>
        <div className={clsx(styles.listTime, "mt-3")}>
          {rangeTime &&
            rangeTime.length > 0 &&
            rangeTime.map((item, index) => {
              return (
                <Button
                  variant="outline-info"
                  active={item.isSelected}
                  className={styles.itemTime}
                  onClick={() => this.handleClickBtnTime(item)}
                >
                  {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                </Button>
              )
            })}
        </div>

        <Button className="mt-3" onClick={() => this.handleSaveShedult()}>
          <FormattedMessage id="manage-schedule.save" />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  language: state.app.language,
  allDoctors: state.admin.allDoctors,
  allScheduleTime: state.admin.allScheduleTime,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MangeSchedule)
