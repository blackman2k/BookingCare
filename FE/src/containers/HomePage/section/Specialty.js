import styles from "./Section.module.scss"
import Slider from "react-slick"
import clsx from "clsx"
import { Container } from "react-bootstrap"
import { getAllSpecialty } from "../../../services/userService"
import React, { Component } from "react"
import { FormattedMessage } from "react-intl"
import { withRouter } from "react-router"
import { connect } from "react-redux"

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

class Specialty extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSpecialty: [],
    }
  }

  async componentDidMount() {
    let res = await getAllSpecialty()
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      })
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`)
    }
  }

  render() {
    const { dataSpecialty } = this.state

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }
    return (
      <div className={clsx(styles.sectionsHomePage)}>
        <Container>
          <div className={styles.headerSection}>
            <h3 className={styles.titleHeader}>
              <FormattedMessage id="homepage.specialty-poplular" />
            </h3>
            <button className={styles.btnMoreInfo}>
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className={styles.bodySection}>
            <Slider {...settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className={styles.itemSilder}
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
)
