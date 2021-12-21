import React, { Component } from "react"
import { connect } from "react-redux"
import MarkdownIt from "markdown-it"
import { FormattedMessage } from "react-intl"
import MdEditor from "react-markdown-editor-lite"
import { CommonUtils } from "../../../utils"
import { createNewClinic } from "../../../services/userService"
import { toast } from "react-toastify"
import styles from "./ManageClinic.module.scss"
import { divide } from "lodash"
import clsx from "clsx"
import { Button, Col, Row, Form, Modal } from "react-bootstrap"
import Select from "react-select"

const mdParser = new MarkdownIt()

export class ManageSpecialty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      adrress: "",
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state }
    stateCopy[id] = event.target.value
    this.setState({
      ...stateCopy,
    })
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    })
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files
    let file = data[0]
    if (file) {
      let base64 = await CommonUtils.getBase64(file)
      this.setState({
        imageBase64: base64,
      })
    }
  }

  handleSaveNewSpecialty = async () => {
    let res = await createNewClinic(this.state)
    if (res && res.errCode === 0) {
      toast.success("Add new clinic succeeds!")
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      })
    } else {
      toast.error("Somethin wrongs...")
    }
  }

  render() {
    return (
      <>
        <Modal
          onHide={this.props.handleClose}
          show={this.props.show}
          size="xl"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm phòng khám</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={clsx(styles.manageSpecialtyContainer, "container")}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Tên phòng khám</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.name}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "name")
                    }
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Ảnh phòng khám</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                </Form.Group>
              </Row>
              <Form.Group as={Col}>
                <Form.Label>Địa chỉ phòng khám</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                />
              </Form.Group>
              <Row className="my-3">
                <MdEditor
                  style={{ height: "300px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  value={this.state.descriptionMarkdown}
                />
              </Row>
              <Button onClick={() => this.handleSaveNewSpecialty()}>
                Thêm phòng khám
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty)
