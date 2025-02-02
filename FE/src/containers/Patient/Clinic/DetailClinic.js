import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import styles from "./DetailClinic.module.scss"
import Header from "../../HomePage/Header"
import DoctorSchedule from "../Doctor/DoctorSchedule"
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor"
import ProfileDoctor from "../Doctor/ProfileDoctor"
import { Container, Form } from "react-bootstrap"
import clsx from "clsx"
import {
  getAllDetailClinicById,
  getAllCodeService,
} from "../../../services/userService"
import _ from "lodash"
import { LANGUAGES } from "../../../utils"
import HeaderSection from "../../Common/HeaderSection"

export class DetailClinic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    }
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id

      let res = await getAllDetailClinicById({
        id: id,
      })

      if (res && res.errCode === 0) {
        let data = res.data
        let arrDoctorId = []
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic
          if (arr && arr.length > 0) {
            arr.forEach((item) => {
              arrDoctorId.push(item.doctorId)
            })
          }
        }
        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        })
      }
    }
  }

  render() {
    const { arrDoctorId, dataDetailClinic } = this.state

    const { language } = this.props
    return (
      <div>
        <HeaderSection titleHeader={dataDetailClinic.name} />
        <Container className="mt-header-section">
          <div className={styles.descriptionClinic}>
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <h2 className={clsx(styles.nameClinic, "mt-4")}>
                  {dataDetailClinic.name}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic?.descriptionHTML,
                  }}
                ></div>
              </>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic)
