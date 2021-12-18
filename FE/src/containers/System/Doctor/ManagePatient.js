import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import styles from "./ManagePatient.module.scss"
import DatePicker from "../../../components/Input/DatePicker"
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import Select from "react-select"
import { getAllPatientForDoctor } from "../../../services/userService"
import moment from "moment"

export class ManagePatient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
    }
  }

  async componentDidMount() {
    const { user } = this.props
    const { currentDate } = this.state
    const formatedDate = new Date(currentDate).getTime()
    this.getDataPatient(user, formatedDate)
  }

  getDataPatient = async (user, formatedDate) => {
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
      () => {
        const { user } = this.props
        const { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        this.getDataPatient(user, formatedDate)
      }
    )
  }

  handleBtnConfirm = () => {}

  handleBtnRemedy = () => {}

  render() {
    const { dataPatient } = this.state
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
                            onClick={this.handleBtnConfirm}
                            className="mx-1"
                          >
                            Xác nhận
                          </Button>
                          <Button
                            variant="warning"
                            onClick={this.handleBtnRemedy}
                          >
                            Gửi hóa đơn
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td>Bill Gates</td>
                    <td>555577754</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
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
