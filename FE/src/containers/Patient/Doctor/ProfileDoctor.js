import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import { getProfileDoctorById } from "../../../services/userService"
import { LANGUAGES } from "../../../utils"
import NumberFormat from "react-number-format"
import styles from "./ProfileDoctor.module.scss"
import _ from "lodash"
import moment, { lang } from "moment"
import { Link } from "react-router-dom"

export class ProfileDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataProfile: {},
    }
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId)
    this.setState({
      dataProfile: data,
    })
  }

  getInforDoctor = async (id) => {
    let result = {}
    if (id) {
      let res = await getProfileDoctorById(id)
      if (res && res.errCode === 0) {
        result = res.data
      }
    }

    return result
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  renderTimeBooking = (dataTime) => {
    const { language } = this.props
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - DD/MM")
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.priceBooking" />
          </div>
        </>
      )
    }
    return <></>
  }

  render() {
    const { dataProfile } = this.state
    const {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowPrice,
      isShowLinkDetail,
      doctorId,
    } = this.props
    console.log("Dataprofile: ", dataProfile)

    let nameVi = "",
      nameEn = ""

    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
      nameVi = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
    }

    return (
      <div className={styles.profileDoctorContainer}>
        <div className={styles.introDoctor}>
          <div
            className={styles.avatar}
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className={styles.inforDoctor}>
            <div className={styles.nameDoctor}>
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className={styles.description}>
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
            {this.props.isShowLinkDetail && (
              <div className={styles.viewDetailDoctor}>
                <Link to={`/detail-doctor/${doctorId}`}>Xem thêm </Link>
              </div>
            )}
          </div>
        </div>
        {isShowPrice === true && (
          <div className={styles.price}>
            <FormattedMessage id="patient.booking-modal.price" />
            {dataProfile &&
              dataProfile.Doctor_Infor &&
              language === LANGUAGES.VI && (
                <NumberFormat
                  className={styles.currency}
                  value={dataProfile.Doctor_Infor?.priceTypeData?.valueVi}
                  displayType="text"
                  thousandSeparator={true}
                  suffix="VND"
                />
              )}
            {dataProfile &&
              dataProfile.Doctor_Infor &&
              language === LANGUAGES.EN && (
                <NumberFormat
                  className={styles.currency}
                  value={dataProfile.Doctor_Infor?.priceTypeData?.valueEn}
                  displayType="text"
                  thousandSeparator={true}
                  suffix="$"
                />
              )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)
