import React, { Component } from "react"
import styles from "./ManageDoctor.module.scss"
import { Button, Container } from "react-bootstrap"
import * as actions from "../../../store/actions/adminAction"
import { connect } from "react-redux"
import Select from "react-select"
import { languages } from "../../../utils"

import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import clsx from "clsx"
const mdParser = new MarkdownIt(/* Markdown-it options */)

class ManageDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDoctor: "",
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      listDoctorsSelect: [],
    }
  }

  componentDidMount() {
    this.props.getAllDoctors()
  }

  componentDidUpdate = (preProps) => {
    if (
      preProps.listDoctors !== this.props.listDoctors ||
      preProps.language !== this.props.language
    ) {
      this.setState({
        listDoctorsSelect: this.handleConvertDataToSelect(
          this.props.listDoctors
        ),
      })
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    })
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption })
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
      if (this.props.language === languages.VI) {
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
      doctorId: this.state.selectedDoctor?.value,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
    }

    this.props.saveInforDoctor(dataSent)
  }

  render() {
    return (
      <Container>
        <header className="mb-3">
          <h2 className="text-center">Quản lí thông tin bác sĩ</h2>
          <div className={styles.headerContent}>
            <div className={styles.contentLeft}>
              <p className={styles.titleSection}>Chọn bác sĩ</p>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctorsSelect}
                className={clsx(styles.selectDoctor)}
              />
            </div>

            <div className={styles.contentRight}>
              <p className={styles.titleSection}>Thông tin giới thiệu</p>
              <textarea
                cols="30"
                rows="4"
                value={this.state.description}
                onChange={this.handleChangeInput}
              ></textarea>
            </div>
          </div>
        </header>

        <main>
          <p className={styles.titleSection}>Thông tin chi tiết về bác sĩ</p>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </main>
        <Button
          variant="primary"
          className="mt-3"
          onClick={this.handleSaveInfor}
        >
          Lưu thông tin
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listDoctors: state.admin.listDoctors,
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.getAllDoctors()),
    saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor)
