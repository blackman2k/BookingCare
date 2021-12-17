import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import styles from "./DetailSpecialty.module.scss"
import Header from "../../HomePage/Header"
import DoctorSchedule from "../../Patient/Doctor/DoctorSchedule"
import DoctorExtraInfor from "../../Patient/Doctor/DoctorExtraInfor"
import ProfileDoctor from "../../Patient/Doctor/ProfileDoctor"
import { Container } from "react-bootstrap"
import clsx from "clsx"

export class DetailSpecialty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrDoctorId: [35, 36, 37],
    }
  }

  render() {
    const { arrDoctorId } = this.state
    return (
      <div>
        <Header />
        <Container className="mt-header">
          <div className={styles.descriptionSpecialty}></div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className={styles.doctorItem} key={index}>
                  <div className={styles.profileDoctor}>
                    <ProfileDoctor
                      doctorId={item}
                      isShowDescriptionDoctor={true}
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty)
