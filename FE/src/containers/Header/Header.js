import React, { Component, useEffect, useState } from "react"
import { connect } from "react-redux"
import { changeLanguage, processLogout } from "../../store/actions"
import Navigator from "../../components/Navigator"
import { adminMenu, doctorMenu } from "./menuApp"
import styles from "./Header.module.scss"
import clsx from "clsx"
import { LANGUAGES, USER_ROLE } from "../../utils"
import { FormattedMessage } from "react-intl"
import _ from "lodash"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuApp: [],
    }
  }

  componentDidMount() {
    let { userInfo } = this.props
    let menu = []
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu
      }

      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu
      }
    }

    this.setState({
      menuApp: menu,
    })
  }

  handleChangeLanguage = (language) => {
    this.props.changeLanguage(language)
  }

  render() {
    return (
      <div className={styles.headerContainer}>
        <div className={styles.headerTabContainer}>
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className={styles.headerTabRight}>
          <span>
            <FormattedMessage id="header.welcome" />,{" "}
            {this.props.userInfo && this.props.userInfo.firstName
              ? this.props.userInfo.firstName
              : ""}
          </span>
          <div className={styles.languageOptions}>
            <span
              onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
              className={clsx({
                [styles.active]: this.props.language === LANGUAGES.VI,
              })}
            >
              VI
            </span>
            <span
              onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
              className={clsx({
                [styles.active]: this.props.language === LANGUAGES.EN,
              })}
            >
              EN
            </span>
          </div>
          <div
            className={clsx(styles.btnLogout, "btn")}
            onClick={this.props.processLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(processLogout()),
    changeLanguage: (languageSelect) =>
      dispatch(changeLanguage(languageSelect)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
