import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./DoctorExtraInfor.module.scss"
import { getExtraInforDoctorById } from "../../../services/userService"
import NumberFormat from "react-number-format"
import { FormattedMessage } from "react-intl"
import { LANGUAGES } from "../../../utils"
import { Accordion } from "react-bootstrap"

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    }
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        })
      }
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.language !== prevProps.language) {
    }

    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        })
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    })
  }

  render() {
    const { isShowDetailInfor, extraInfor } = this.state
    const { language } = this.props
    return (
      <>
        <div className={styles.contentUp}>
          <p className={styles.titleAdress}>
            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
          </p>
          <p className={styles.nameClinic}>
            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </p>
          <p className={styles.detailAddress}>
            {extraInfor && extraInfor.addressClinic
              ? extraInfor.addressClinic
              : ""}
          </p>
        </div>
        <div className={styles.contenDown}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <FormattedMessage id="patient.extra-infor-doctor.price" />
                <span> </span>
                {extraInfor &&
                  extraInfor.priceTypeData &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      className="currency"
                      value={extraInfor.priceTypeData.valueVi}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="VND"
                    />
                  )}
                {extraInfor &&
                  extraInfor.priceTypeData &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      className="currency"
                      value={extraInfor.priceTypeData.valueEn}
                      displayType="text"
                      thousandSeparator={true}
                      suffix="$"
                    />
                  )}
              </Accordion.Header>
              <Accordion.Body>
                <span className={styles.left}>
                  <FormattedMessage id="patient.extra-infor-doctor.price" />
                </span>
                <span className={styles.right}>
                  {extraInfor &&
                    extraInfor.priceTypeData &&
                    language === LANGUAGES.VI && (
                      <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueVi}
                        displayType="text"
                        thousandSeparator={true}
                        suffix="VND"
                      />
                    )}
                  {extraInfor &&
                    extraInfor.priceTypeData &&
                    language === LANGUAGES.EN && (
                      <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueEn}
                        displayType="text"
                        thousandSeparator={true}
                        suffix="$"
                      />
                    )}
                </span>
                <p className={styles.note}>
                  {extraInfor && extraInfor.note ? extraInfor.note : ""}
                </p>
                <p className={styles.payment}>
                  <FormattedMessage id="patient.extra-infor-doctor.payment" />
                  {extraInfor &&
                  extraInfor.paymentTypeData &&
                  language === LANGUAGES.VI
                    ? extraInfor.paymentTypeData.valueVi
                    : ""}
                  {extraInfor &&
                  extraInfor.paymentTypeData &&
                  language === LANGUAGES.EN
                    ? extraInfor.paymentTypeData.valueEn
                    : ""}
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor)
