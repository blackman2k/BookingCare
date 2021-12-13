import styles from "./Section.module.scss"
import Slider from "react-slick"
import clsx from "clsx"
import { Container } from "react-bootstrap"
import { LANGUAGES } from "../../../utils"
import { Component } from "react"
import { dispatch } from "../../../redux"
import { withRouter } from "react-router"

import * as actions from "../../../store/actions"
import { connect } from "react-redux"
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider"

function SampleNextArrow(props) {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className={clsx(styles.nextArrow, styles.btnSlider)}
    >
      <i className="fas fa-chevron-right"></i>
    </button>
  )
}

function SamplePrevArrow(props) {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className={clsx(styles.prevArrow, styles.btnSlider)}
    >
      <i className="fas fa-chevron-left"></i>
    </button>
  )
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
}

class OutStandingDotor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrDoctors: [],
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      })
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors()
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history)
      this.props.history.push(`detail-doctor/${doctor.id}`)
  }

  render() {
    let arrDoctors = this.state.arrDoctors
    let { language } = this.props
    arrDoctors = arrDoctors
      .concat(arrDoctors)
      .concat(arrDoctors)
      .concat(arrDoctors)
      .concat(arrDoctors)

    return (
      <div className={clsx(styles.sectionsHomePage, styles.outStandingDoctor)}>
        <Container>
          <div className={styles.headerSection}>
            <h3 className={styles.titleHeader}>Bác sĩ nổi bật tuần qua</h3>
            <button className={styles.btnMoreInfo}>XEM THÊM</button>
          </div>
          <div className={styles.bodySection}>
            <Slider {...settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = ""
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    )
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                  let nameEn = `${item.positionData.valueEn},  ${item.firstName} ${item.lastName}`
                  return (
                    <div
                      className={styles.itemSilder}
                      onClick={() => this.handleViewDetailDoctor(item)}
                      key={item?.id}
                    >
                      <div
                        className={styles.coverItem}
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                      <h6 className={styles.nameDoctor}>
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                      </h6>
                      <span className={styles.positionDoctor}>Tiêu hóa</span>
                    </div>
                  )
                })}
            </Slider>
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDotor)
)
