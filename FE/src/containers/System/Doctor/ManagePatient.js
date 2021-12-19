import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import styles from "./ManagePatient.module.scss"
import DatePicker from "../../../components/Input/DatePicker"
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import Select from "react-select"
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService"
import moment from "moment"
import { LANGUAGES } from "../../../utils"
import RemedyModal from "./RemedyModal"
import { toast } from "react-toastify"

export class ManagePatient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    }
  }

  async componentDidMount() {
    this.getDataPatient()
  }

  getDataPatient = async () => {
    const { user } = this.props
    const { currentDate } = this.state
    const formatedDate = new Date(currentDate).getTime()
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    })
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      })
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient()
      }
    )
  }

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    }
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    })
  }
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    })
  }

  sendRemedy = async (dataChild) => {
    const { dataModal } = this.state
    this.setState({
      isShowLoading: true,
    })

    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    })

    if (res && res.errCode === 0) {
      toast.success("Send remedy succeeds!")
      this.closeRemedyModal()
      await this.getDataPatient()
    } else {
      toast.error("Something wrongs...")
    }
  }

  handleBtnRemedy = () => {}

  render() {
    const { dataPatient, isOpenRemedyModal, dataModal } = this.state
    const { language } = this.props
    return (
      <div className={styles.managePatientContainer}>
        <Container>
          <h2 className="text-center mt-3">Quản lý bệnh nhân khám bệnh</h2>
          <div className={styles.managePatientBody}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </Form.Label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Họ và tên</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient.map((item, index) => {
                    let time =
                      language === LANGUAGES.VI
                        ? item.timeTypeDataPatient.valueVi
                        : item.timeTypeDataPatient.valueEn
                    let gender =
                      language === LANGUAGES.VI
                        ? item.patientData.genderData.valueVi
                        : item.patientData.genderData.valueEn
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.timeTypeDataPatient.valueVi}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.address}</td>
                        <td>{item.patientData.genderData.valueVi}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => this.handleBtnConfirm(item)}
                          >
                            Xác nhận
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center" }}>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  user: state.user.userInfo,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient)
