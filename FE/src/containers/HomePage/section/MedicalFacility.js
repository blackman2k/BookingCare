import styles from "./Section.module.scss"
import Slider from "react-slick"
import clsx from "clsx"
// import { Container } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { getAllClinic } from "../../../services/userService"
import { withRouter } from "react-router"
import { Component } from "react"
import { FormattedMessage } from "react-intl"

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

class MedicalFacility extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataClinics: [],
    }
  }

  async componentDidMount() {
    let res = await getAllClinic()
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      })
    }
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`)
    }
  }

  render() {
    const { dataClinics } = this.state
    return (
      <div
        className={clsx(
          styles.sectionsHomePage,
          styles.medicalFacility,
          "mt-header-section"
        )}
        id="clinics"
      >
        <Container>
          <div className={styles.headerSection}>
            <h3 className={styles.titleHeader}>
              <FormattedMessage id="header.health-facility" />
            </h3>
            {/* <button className={styles.btnMoreInfo}>
              <FormattedMessage id="homepage.more-infor" />
            </button> */}
          </div>
          <div className={styles.bodySection}>
            <Slider {...settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div
                      className={styles.itemSilder}
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div
                        className={styles.coverItem}
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <h6 className={styles.titleItem}>{item.name}</h6>
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

export default withRouter(MedicalFacility)
