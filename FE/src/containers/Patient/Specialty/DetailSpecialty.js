import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import styles from "./DetailSpecialty.module.scss"
import Header from "../../HomePage/Header"
import DoctorSchedule from "../Doctor/DoctorSchedule"
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor"
import ProfileDoctor from "../Doctor/ProfileDoctor"
import { Container, Form } from "react-bootstrap"
import clsx from "clsx"
import {
  getAllDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService"
import _ from "lodash"
import { LANGUAGES } from "../../../utils"
import HeaderSection from "../../Common/HeaderSection"

export class DetailSpecialty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    }
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: "ALL",
      })

      let resProvince = await getAllCodeService("PROVINCE")

      if (res && res.errCode === 0 && resProvince.errCode === 0) {
        let data = res.data
        let arrDoctorId = []
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty
          if (arr && arr.length > 0) {
            arr.forEach((item) => {
              arrDoctorId.push(item.doctorId)
            })
          }
        }

        let dataProvince = resProvince.data
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn quốc",
          })
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        })
      }
    }
  }

  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id
      let location = event.target.value

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location,
      })

      if (res && res.errCode === 0) {
        let data = res.data
        let arrDoctorId = []
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty
          if (arr && arr.length > 0) {
            arr.forEach((item) => {
              arrDoctorId.push(item.doctorId)
            })
          }

          this.setState({
            dataDetailSpecialty: res.data,
            arrDoctorId: arrDoctorId,
          })
        }
      }
    }
  }

  render() {
    const { arrDoctorId, dataDetailSpecialty, listProvince } = this.state

    const { language } = this.props
    return (
      <div>
        <HeaderSection titleHeader={dataDetailSpecialty?.name} />
        <Container className="mt-header">
          <div className={styles.descriptionSpecialty}>
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty?.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className={styles.provinceSelect}>
            <Form.Select onChange={(event) => this.handleOnChangeSelect(event)}>
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  )
                })}
            </Form.Select>
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className={styles.doctorItem} key={index}>
                  <div className={styles.profileDoctor}>
                    <ProfileDoctor
                      doctorId={item}
                      isShowDescriptionDoctor={true}
                      isShowLinkDetail={true}
                      isShowPrice={false}
                    />
                  </div>
                  <div className={styles.doctorExtraInfor}>
                    <div className={styles.doctorSchedule}>
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                    <div className={clsx(styles.doctorInfor, "mt-3")}>
                      <DoctorExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              )
            })}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty)
