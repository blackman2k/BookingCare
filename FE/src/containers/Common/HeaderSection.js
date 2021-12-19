import React, { Component } from "react"
import { Container } from "react-bootstrap"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { LANGUAGES } from "../../utils"
import styles from "./HeaderSection.module.scss"

export class HeaderSection extends Component {
  constructor(props) {
    super(props)
  }

  handleCickLogo = (e) => {
    this.props.history.push("/home")
  }

  render() {
    return (
      <Container fluid className={styles.headerContainer}>
        <div className={styles.backHomeBtn} onClick={this.handleCickLogo}>
          <i className="fas fa-chevron-left"></i>
          {this.props.language === LANGUAGES.VI ? "QUAY LẠI" : "BACK"}
        </div>
        <div className={styles.titleHeader}>
          <p>{this.props?.titleHeader}</p>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderSection)
)
