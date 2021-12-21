import React, { Component } from "react"
import { connect } from "react-redux"
import MarkdownIt from "markdown-it"
import { FormattedMessage } from "react-intl"
import MdEditor from "react-markdown-editor-lite"
import { CommonUtils } from "../../../utils"
import {
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  editClinic,
  editSpecialty,
} from "../../../services/userService"
import { toast } from "react-toastify"
import styles from "./ManageClinic.module.scss"
import { divide } from "lodash"
import clsx from "clsx"
import { Button, Col, Row, Form } from "react-bootstrap"
import Select from "react-select"
import ModalCreateClinic from "./ModalCreateClinic"

const mdParser = new MarkdownIt()

export class ManageClinic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      image: "",
      address: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      selectedOption: "",
      listOptions: [],
      isOpenModal: false,
    }
  }

  async componentDidMount() {
    let res = await getAllClinic()
    let options = res.data.map((item) => {
      return {
        value: item.id,
        label: item.name,
      }
    })

    this.setState({
      listOptions: options,
    })
  }

  handleChangeSelect = async (selectedOption, name) => {
    console.log("selected", selectedOption)
    let res = await getAllDetailClinicById({
      id: selectedOption.value,
      location: "ALL",
    })
    let dataSpecialty = res.data
    this.setState({
      name: dataSpecialty.name,
      descriptionMarkdown: dataSpecialty.descriptionMarkdown,
      descriptionHTML: dataSpecialty.descriptionHTML,
      selectedOption: selectedOption,
      image: dataSpecialty.image,
      address: dataSpecialty.address,
    })
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
        image: base64,
      })
    }
  }

  handleSaveNewClinic = async () => {
    console.log(this.state.selectedOption)
    let res = await editSpecialty(this.state.selectedOption.value, this.state)
    if (res && res.errCode === 0) {
      toast.success("Save clinic succeeds!")
      this.setState({
        name: "",
        image: "",
        descriptionHTML: "",
        address: "",
        descriptionMarkdown: "",
      })
    } else {
      toast.error("Something wrongs...")
    }
    // let res = await createNewClinic(this.state)
    // if (res && res.errCode === 0) {
    //   toast.success("Add new clinic succeeds!")
    //   this.setState({
    //     name: "",
    //     image: "",
    //     descriptionHTML: "",
    //     address: "",
    //     descriptionMarkdown: "",
    //   })
    // } else {
    //   toast.error("Something wrongs...")
    // }
  }

  render() {
    return (
      <>
        {this.state.isOpenModal && (
          <ModalCreateClinic
            handleClose={() => this.setState({ isOpenModal: false })}
            show={this.state.isOpenModal}
          />
        )}
        <div className={clsx(styles.manageSpecialtyContainer, "container")}>
          <h2 className={clsx("text-center", "mt-3")}>Quản lý phòng khám</h2>
          <Row className="mb-3">
            <Col className="ml-auto">
              <Button onClick={() => this.setState({ isOpenModal: true })}>
                Thêm phòng khám
              </Button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  <FormattedMessage id="admin.manage-doctor.clinic" />
                </Form.Label>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChangeSelect}
                  options={this.state.listOptions}
                  className={clsx(styles.selectDoctor)}
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.clinic" />
                  }
                  name="selectedSpecialty"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Tên phòng khám</Form.Label>
              <Form.Control
                type="text"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeInput(event, "name")}
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
              onChange={(event) => this.handleOnChangeInput(event, "address")}
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
          <Button onClick={() => this.handleSaveNewClinic()}>
            Lưu thay đổi
          </Button>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic)
