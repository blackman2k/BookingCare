import React, { Component } from "react"
import styles from "./DetailDoctor.module.scss"
import { Button, Container } from "react-bootstrap"
import * as actions from "../../../store/actions/adminAction"
import { connect } from "react-redux"
import Select from "react-select"
import { LANGUAGES } from "../../../utils"
import clsx from "clsx"
import { userService } from "../../../services"
import Header from "../../HomePage/Header"
import DoctorSchedule from "./DoctorSchedule"
import DoctorExtraInfor from "./DoctorExtraInfor"

class DetailDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    }
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id
      this.setState({
        currentDoctorId: id,
      })
      let res = await userService.getDetailInforDoctor(id)
      console.log(res)
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        })
      }
    }
  }

  componentDidUpdate = (preProps) => {}

  render() {
    const { language } = this.props
    const { detailDoctor } = this.state
    let nameVi = "",
      nameEn = ""
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
    }
    return (
      <div className={styles.detailDoctor}>
        <Header isShowBanner={false} />
        <Container className="py-3">
          <header className={styles.header}>
            <div
              className={styles.avatar}
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className={styles.contentHeader}>
              <div className={styles.titleContent}>
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className={styles.mainContent}>
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <p>{detailDoctor.Markdown.description}</p>
                  )}
              </div>
            </div>
          </header>
          <main className={clsx(styles.main, "mt-3")}>
            <div className={styles.doctorScheduleContainer}>
              <div className={styles.allSchedule}>
                <DoctorSchedule
                  doctorIdFromParent={this.state.currentDoctorId}
                />
              </div>
              <div className={styles.addressContainer}>
                <DoctorExtraInfor
                  doctorIdFromParent={this.state.currentDoctorId}
                />
              </div>
            </div>
            <section className={styles.detaiInforDoctor}>
              {detailDoctor &&
                detailDoctor.Markdown &&
                detailDoctor.Markdown.contentHTML && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detailDoctor.Markdown.contentHTML,
                    }}
                  ></div>
                )}
            </section>
            <section className={styles.commentDoctor}></section>
          </main>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)
