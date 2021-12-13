import React, { Component } from "react"
import styles from "./ManageDoctor.module.scss"
import { Button, Container } from "react-bootstrap"
import * as actions from "../../../store/actions/adminAction"
import { connect } from "react-redux"
import Select from "react-select"
import { LANGUAGES } from "../../../utils"

import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import clsx from "clsx"
import { userService } from "../../../services"
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
    this.props.fetchAllDoctors()
  }

  componentDidUpdate = (preProps) => {
    if (
      preProps.allDoctors !== this.props.allDoctors ||
      preProps.language !== this.props.language
    ) {
      this.setState({
        listDoctorsSelect: this.handleConvertDataToSelect(
          this.props.allDoctors
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

  handleChange = async (selectedOption) => {
    let user = await userService.getDetailInforDoctor(selectedOption.value)
    console.log(user)
    if (user && user.data.Markdown) {
      this.setState(
        {
          contentHTML: user.data.Markdown.contentHTML,
          contentMarkdown: user.data.Markdown.contentMarkdown,
          description: user.data.Markdown.description,
        },
        () => {
          console.log(this.state)
        }
      )
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
      })
    }
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
      doctorId: this.state.selectedDoctor?.value,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
    }

    this.props.saveInforDoctor(dataSent)
  }

  render() {
    console.log("List doctors: ", this.props.allDoctors)
    return (
      <Container>
        <header className="mb-3">
          <h2 className="text-center mt-3">Quản lí thông tin bác sĩ</h2>
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
            value={this.state.contentMarkdown}
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
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor)
