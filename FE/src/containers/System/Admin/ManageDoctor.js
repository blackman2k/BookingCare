import React, { Component } from "react"
import styles from "./ManageDoctor.module.scss"
import { Button, Container } from "react-bootstrap"
import * as actions from "../../../store/actions/adminAction"
import { connect } from "react-redux"
import Select from "react-select"

import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import clsx from "clsx"
const mdParser = new MarkdownIt(/* Markdown-it options */)

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text)
}

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
]

class ManageDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDoctor: "",
      contentHTML: "",
      contentMarkdown: "",
      description: "",
    }
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
                options={options}
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
            onChange={handleEditorChange}
          />
        </main>
        <Button variant="primary" className="mt-3">
          Lưu thông tin
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUser: (userId) => dispatch(actions.deleteUserStart(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor)
