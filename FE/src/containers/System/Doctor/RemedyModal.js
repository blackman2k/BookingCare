import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import { Button, Modal, Form } from "react-bootstrap"
import { CommonUtils } from "../../../utils"

export class RemedyModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      imgBase64: "",
    }
  }

  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      })
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    })
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files
    let file = data[0]
    if (file) {
      let base64 = await CommonUtils.getBase64(file)
      this.setState({
        imgBase64: base64,
      })
    }
  }

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state)
  }

  render() {
    const { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props
    return (
      <Modal
        show={isOpenModal}
        onHide={closeRemedyModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Gửi hóa đơn khám bệnh thành công </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email bệnh nhân</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeEmail(event)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Chọn file đơn thuốc</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeRemedyModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => this.handleSendRemedy()}>
            Gửi
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal)
