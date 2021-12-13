import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./ManageSchedule.module.scss"
import { FormattedMessage } from "react-intl"
import Select from "react-select"
import * as actions from "../../../store/actions"
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils"
import { DatePicker } from "../../../components/Input/"
import moment from "moment"
import { Button, Col, Form, Row } from "react-bootstrap"
import clsx from "clsx"

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
      this.setState({
        rangeTime: this.props.allScheduleTime,
      })
    }
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
        object.value = item.div
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
                <Button variant="outline-info" className={styles.itemTime}>
                  {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                </Button>
              )
            })}
        </div>

        <Button className="mt-3">
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
