import React, { Component } from "react"
import styles from "./ManageDoctor.module.scss"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import * as actions from "../../../store/actions/adminAction"
import { connect } from "react-redux"
import Select from "react-select"
import { LANGUAGES } from "../../../utils"

import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import clsx from "clsx"
import { userService } from "../../../services"
import { FormattedMessage } from "react-intl"
const mdParser = new MarkdownIt(/* Markdown-it options */)

class ManageDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //save to Markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    }
  }

  componentDidMount() {
    this.props.fetchAllDoctors()
    this.props.getAllRequiredDoctorInfor()
  }

  buildDataInputSelect = (inputData, type) => {
    let result = []
    const { language } = this.props
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {}
        let labelVi =
          type === "USERS" ? `${item.lastName} ${item.firstName}` : item.valueVi
        let labelEn =
          type === "USERS" ? `${item.firstName} ${item.lastName}` : item.valueEn
        object.label = language == LANGUAGES.VI ? labelVi : labelEn
        object.value = item.id
        result.push(object)
      })
    }
    return result
  }

  componentDidUpdate = (preProps) => {
    if (preProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS")
      this.setState({
        listDoctors: dataSelect,
      })
    }
    if (preProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
      this.setState({
        listDoctors: dataSelect,
      })
    }
    if (preProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      const { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor

      let dataSelectPrice = this.buildDataInputSelect(resPrice)
      let dataSelectPayment = this.buildDataInputSelect(resPayment)
      let dataSelectProvince = this.buildDataInputSelect(resProvince)

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      })
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    })
  }

  handleChange = async (selectedOption) => {
    let user = await userService.getDetailInforDoctor(selectedOption.value)
    console.log(user)
    if (user && user.data.Markdown) {
      this.setState({
        contentHTML: user.data.Markdown.contentHTML,
        contentMarkdown: user.data.Markdown.contentMarkdown,
        description: user.data.Markdown.description,
        hasOldData: true,
      })
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      })
    }
    this.setState({ selectedOption: selectedOption })
  }

  handleChangeInput = (e) => {
    const target = e.target
    const name = target.name
    const value = target.type === "checkbox" ? target.selected : target.value
    this.setState({
      description: value,
    })
  }
  handleConvertDataToSelect = (data) => {
    return data.map((item) => {
      let label = ""
      if (this.props.language === LANGUAGES.VI) {
        label = `${item.lastName} ${item.firstName}`
      } else {
        label = `${item.firstName} ${item.lastName} `
      }
      return {
        value: item.id,
        label: label,
      }
    })
  }

  handleSaveInfor = (e) => {
    e.preventDefault()

    let dataSent = {
      doctorId: this.state.selectedOption?.value,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
    }

    this.props.saveInforDoctor(dataSent)
  }

  render() {
    const { hasOldData } = this.state
    console.log("List doctors: ", this.props.allDoctors)
    return (
      <Container>
        <header className="mb-3">
          <h2 className="text-center mt-3">
            <FormattedMessage id="admin.manage-doctor.titile" />
          </h2>
          <div className={styles.headerContent}>
            <div className={styles.contentLeft}>
              <p className={styles.titleSection}>
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              </p>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.listDoctors}
                className={clsx(styles.selectDoctor)}
                placeholder="Chọn bác sĩ"
              />
            </div>

            <div className={styles.contentRight}>
              <p className={styles.titleSection}>
                <FormattedMessage id="admin.manage-doctor.intro" />
              </p>
              <textarea
                cols="30"
                rows="4"
                value={this.state.description}
                onChange={this.handleChangeInput}
              ></textarea>
            </div>
          </div>
        </header>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Chọn giá</Form.Label>
              <Select
                // value={this.state.listPrice}
                // onChange={this.handleChange}
                options={this.state.listDoctors}
                className={clsx(styles.selectDoctor)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Chọn phương thức thanh toán</Form.Label>
              <Select
                // value={this.state.listPayment}
                // onChange={this.handleChange}
                options={this.state.listDoctors}
                className={clsx(styles.selectDoctor)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Chọn tỉnh thành</Form.Label>
              <Select
                // value={this.state.listProvince}
                // onChange={this.handleChange}
                options={this.state.listDoctors}
                className={clsx(styles.selectDoctor)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Tên phòng khám</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Địa chỉ phòng khám</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
        </Row>

        <main>
          <p className={styles.titleSection}>Thông tin chi tiết về bác sĩ</p>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </main>
        <Button
          variant="primary"
          className="mt-3"
          onClick={this.handleSaveInfor}
        >
          {hasOldData === true ? (
            <FormattedMessage id="admin.manage-doctor.save" />
          ) : (
            <FormattedMessage id="admin.manage-doctor.add" />
          )}
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor)
