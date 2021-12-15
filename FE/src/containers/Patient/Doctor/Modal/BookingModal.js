import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import styles from "./BookingModal.module.scss"
import { Modal, Button, Form, Col, Row } from "react-bootstrap"
import ProfileDoctor from "../ProfileDoctor"
import _ from "lodash"

export class BookingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
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
          <Modal.Title>Thông tin đặt lịch khám bệnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.doctorInfor}>
            <ProfileDoctor doctorId={doctorId} />
          </div>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="name">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control type="text" id="name" name="name" />
              </Form.Group>
              <Form.Group as={Col} controlId="phone">
                <Form.Label>Số diện thoại</Form.Label>
                <Form.Control type="text" id="name" name="name" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Địa chỉ email</Form.Label>
                <Form.Control type="email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Địa chỉ liên hệ</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Lý do khám</Form.Label>
              <Form.Control />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Đặt cho ai</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Giới tính</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>Nam</option>
                  <option>Nữ</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit" className="ml-auto">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={closeBookingClose}>
            Hủy
          </Button>
          <Button variant="primary">Xác nhận</Button>
        </Modal.Footer> */}
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)
