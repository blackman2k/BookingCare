import logo from "../../assets/images/hospital.svg"
import styles from "./HomePage.module.scss"
import clsx from "clsx"
import { isClassExpression } from "typescript"
import { useState, useRef, useEffect } from "react"
import { FormattedMessage } from "react-intl"
import { changeLanguage, processLogout } from "../../store/actions"
import { dispatch } from "../../redux"
import { connect } from "react-redux"
import { FaTooth, FaHeadSideVirus } from "react-icons/fa"
import { LANGUAGES } from "../../utils"
import { withRouter } from "react-router"
import { Button } from "react-bootstrap"
import userService from "../../services/userService"
import { result } from "lodash"

function Header(props) {
  const [textSearch, setTextSearch] = useState("")
  const [resultSearch, setResultSearch] = useState([])

  const handleChangeLanguage = (language) => {
    props.changeLanguage(language)
  }

  const handleCickLogo = (e) => {
    props.history.push("/home")
  }

  const handleClickManage = (e) => {
    if (props.userInfo) {
      if (props.userInfo.roleId === "R1") {
        props.history.push("/system/manage-user")
      } else {
        props.history.push("/doctor/manage-schedule")
      }
    }
  }

  const handleStartSearch = async () => {
    let res = await userService.search(textSearch)
    if (res && res.errCode === 0) {
      let doctors = res.result.doctors
      let clinic = res.result.clinics
      let result = []
      result = doctors.map((item, index) => {
        return {
          id: item.id,
          type: 1,
          valueDisplay:
            props.language === LANGUAGES.VI
              ? `Bác sĩ, ${item.firstName} ${item.lastName}`
              : `Doctor, ${item.lastName} ${item.firstName}`,
        }
      })
      result = [
        ...result,
        ...clinic.map((item, index) => {
          return {
            id: item.id,
            type: 0,
            valueDisplay:
              props.language === LANGUAGES.VI
                ? `Cơ sở, ${item.name}`
                : `Clinic, ${item.name}`,
          }
        }),
      ]
      setResultSearch(result)
    }
  }

  let timeOutId = useRef()

  const handleOnChangeSearch = (e) => {
    if (timeOutId.current) {
      clearTimeout(timeOutId.current)
    }
    setTextSearch(e.target.value)
    timeOutId.current = setTimeout(() => {
      handleStartSearch()
    }, 500)
  }

  const handleClickItemSearch = (item) => {
    if (item.type === 1) {
      props.history.push(`/detail-doctor/${item.id}`)
    } else {
      props.history.push(`detail-clinic/${item.id}`)
    }
  }

  return (
    <div className={clsx(styles.headerContainer)}>
      <div className={styles.navbar}>
        <div className={clsx(styles.headerWrapper, "container")}>
          <div className={clsx(styles.headerLogo)}>
            <div
              className={styles.headerLogoImage}
              onClick={handleCickLogo}
            ></div>
          </div>
          <div className={clsx(styles.headerList)}>
            <a className={styles.headerItemList} href="#specialties">
              <p>
                <b>
                  <FormattedMessage id="header.speciality" />
                </b>
              </p>
              <p className={styles.headerSubtitle}>
                <FormattedMessage id="header.searchdoctor" />
              </p>
            </a>
            <a className={styles.headerItemList} href="#clinics">
              <p>
                <b>
                  <FormattedMessage id="header.health-facility" />
                </b>
              </p>
              <p>
                <FormattedMessage id="header.select-room" />
              </p>
            </a>
            <a className={styles.headerItemList} href="#doctors">
              <p>
                <b>
                  <FormattedMessage id="header.doctor" />
                </b>
              </p>
              <p>
                <FormattedMessage id="header.select-doctor" />
              </p>
            </a>
          </div>
          <div className={clsx(styles.headerRight)}>
            {/* <i className="fas fa-question-circle"></i> */}
            {props.userInfo?.roleId === "R1" ||
            props.userInfo?.roleId === "R2" ? (
              <Button
                className="mx-2"
                variant="outline-primary"
                onClick={handleClickManage}
              >
                <FormattedMessage id="header.manage" />
              </Button>
            ) : (
              ""
            )}
            {props.isLoggedIn && (
              <span
                onClick={() => {
                  props.processLogout()
                }}
              >
                <FormattedMessage id="header.logout" />
              </span>
            )}
            {!props.isLoggedIn && (
              <span
                onClick={() => {
                  props.history.push("/login")
                }}
              >
                <FormattedMessage id="header.login" />
              </span>
            )}

            <div className={styles.languageOptions}>
              <span
                onClick={() => handleChangeLanguage("vi")}
                className={clsx({
                  [styles.active]: props.language === LANGUAGES.VI,
                })}
              >
                VI
              </span>
              <span
                onClick={() => handleChangeLanguage("en")}
                className={clsx({
                  [styles.active]: props.language === LANGUAGES.EN,
                })}
              >
                EN
              </span>
            </div>
          </div>
        </div>
      </div>
      {props.isShowBanner && (
        <div className={styles.bannerHomePage}>
          <div className={styles.content}>
            <div className={styles.title}>
              <h2>
                <FormattedMessage id="banner.title1" /> <br />{" "}
                <b>
                  <FormattedMessage id="banner.title2" />
                </b>
              </h2>
            </div>
            <div className={textSearch ? styles.searchActive : styles.search}>
              <input
                type="text"
                placeholder={
                  props.language === LANGUAGES.VI
                    ? "Tìm kiếm bác sĩ/ cơ sở y tế"
                    : "Search for doctor/ medical facility"
                }
                value={textSearch}
                onChange={(e) => handleOnChangeSearch(e)}
              />
              <i className="fas fa-search"></i>
              <div className={styles.contentSearch}>
                {resultSearch &&
                  resultSearch.length > 0 &&
                  resultSearch.map((item, index) => {
                    return (
                      <p
                        className={styles.itemSearch}
                        onClick={(event) => handleClickItemSearch(item)}
                      >
                        {item.valueDisplay}
                      </p>
                    )
                  })}
              </div>
            </div>
            <div className={styles.listOptions}>
              {/* <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <i className="fas fa-hospital"></i>
                </div>
                <p className={styles.titleOptions}>
                  <FormattedMessage id="banner.option1" />
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <i className="fas fa-mobile"></i>
                </div>
                <p className={styles.titleOptions}>
                  <FormattedMessage id="banner.option2" />
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <i className="fas fa-notes-medical"></i>
                </div>
                <p className={styles.titleOptions}>
                  <FormattedMessage id="banner.option3" />
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <i className="fas fa-vial"></i>
                </div>
                <p className={styles.titleOptions}>
                  <FormattedMessage id="banner.option4" />
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <FaHeadSideVirus />
                </div>
                <p className={styles.titleOptions}>
                  <FormattedMessage id="banner.option5" />
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <FaTooth />
                </div>
                <p className={styles.titleOptions}>
                  <FormattedMessage id="banner.option6" />
                </p>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (languageSelect) =>
      dispatch(changeLanguage(languageSelect)),
    processLogout: () => dispatch(processLogout()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
