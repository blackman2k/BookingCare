import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import styles from "./ManagePatient.module.scss"
import DatePicker from "../../../components/Input/DatePicker"
import { Col, Container, Form, Row, Table } from "react-bootstrap"
import Select from "react-select"

export class ManagePatient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: new Date(),
    }
  }

  async componentDidMount() {}

  render() {
    return (
      <div className={styles.managePatientContainer}>
        <Container>
          <h2 className="text-center">Quản lý bệnh nhân khám bệnh</h2>
          <div className={styles.managePatientBody}>
            <Row className="mb-3">
              <Col>
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
                  <th>Name</th>
                  <th colSpan={2}>Telephone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bill Gates</td>
                  <td>555577754</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient)
