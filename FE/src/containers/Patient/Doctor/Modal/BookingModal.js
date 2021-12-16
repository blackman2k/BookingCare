import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import styles from "./BookingModal.module.scss"
import { Modal, Button, Form, Col, Row } from "react-bootstrap"
import ProfileDoctor from "../ProfileDoctor"
import _ from "lodash"
import { DatePicker } from "../../../../components/Input"
import * as actions from "../../../../store/actions"
import { LANGUAGES } from "../../../../utils"
import Select from "react-select"
import { postPatientBookAppointment } from "../../../../services/userService"
import { toast } from "react-toastify"
import moment from "moment"

export class BookingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: [],
      timeType: "",
    }
  }

  componentDidMount() {
    this.props.getGenders()
  }

  buildDataGender = (data) => {
    let result = []
    let language = this.props.language
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {}
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
        object.value = item.keyMap
        result.push(object)
      })
    }
    return result
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      })
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      })
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId
        let timeType = this.props.dataTime.timeType
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        })
      }
    }
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value
    let stateCopy = { ...this.state }
    stateCopy[id] = valueInput
    this.setState({
      ...stateCopy,
    })
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    })
  }

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption })
  }

  buildTimeBooking = (dataTime) => {
    const { language } = this.props
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn

      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY")

      return `${time} - ${date}`
    }
    return ""
  }

  buildDoctorName = (dataTime) => {
    const { language } = this.props
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

      return name
    }
    return ""
  }

  handleConfirmBooking = async () => {
    //validate

    let date = new Date(this.state.birthday).getTime()
    let timeString = this.buildTimeBooking(this.props.dataTime)
    let doctorName = this.buildDoctorName(this.props.dataTime)
    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    })

    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeed!")
      this.props.closeBookingClose()
    } else {
      toast.error("Booking a new appointment error!")
    }
  }

  render() {
    const { isOpenModal, closeBookingClose, dataTime } = this.props
    let doctorId = ""
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId
    }

    return (
      <Modal
        show={isOpenModal}
        onHide={closeBookingClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="patient.booking-modal.title" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.doctorInfor}>
            <ProfileDoctor
              doctorId={doctorId}
              isShowDescriptionDoctor={false}
              dataTime={dataTime}
            />
          </div>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>
                  <FormattedMessage id="patient.booking-modal.fullName" />
                </Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "fullName")
                  }
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>
                  <FormattedMessage id="patient.booking-modal.phoneNumber" />
                </Form.Label>
                <Form.Control
                  type="text"
                  id="phone"
                  name="phone"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phoneNumber")
                  }
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>
                  <FormattedMessage id="patient.booking-modal.email" />
                </Form.Label>
                <Form.Control
                  type="email"
                  value={this.state.email}
                  name="email"
                  id="email"
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>
                  <FormattedMessage id="patient.booking-modal.address" />
                </Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.address}
                  name="address"
                  id="address"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>
                <FormattedMessage id="patient.booking-modal.reason" />
              </Form.Label>
              <Form.Control
                type="text"
                value={this.state.reason}
                name="reason"
                id="reason"
                onChange={(event) => this.handleOnChangeInput(event, "reason")}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </Form.Label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.birthday}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>
                  <FormattedMessage id="patient.booking-modal.gender" />
                </Form.Label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelect}
                  options={this.state.genders}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeBookingClose}>
            <FormattedMessage id="patient.booking-modal.btnCancel" />
          </Button>
          <Button variant="primary" onClick={() => this.handleConfirmBooking()}>
            <FormattedMessage id="patient.booking-modal.btnConfirm" />
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  genders: state.admin.genders,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)
