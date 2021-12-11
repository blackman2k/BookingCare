import styles from "./Section.module.scss"
import Slider from "react-slick"
import clsx from "clsx"
// import { Container } from "react-bootstrap"
import { Container } from "react-bootstrap"

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

function MedicalFacility() {
  console.log("styles: ", styles)

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
    <div className={clsx(styles.sectionsHomePage, styles.medicalFacility)}>
      <Container>
        <div className={styles.headerSection}>
          <h3 className={styles.titleHeader}>Cơ sở y tế nổi bật</h3>
          <button className={styles.btnMoreInfo}>XEM THÊM</button>
        </div>
        <div className={styles.bodySection}>
          <Slider {...settings}>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>
                Hệ thống Y tế Thu Cúc cơ sở 1
              </h6>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>
                Hệ thống Y tế Thu Cúc cơ sở 2
              </h6>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>
                Hệ thống Y tế Thu Cúc cơ sở 3
              </h6>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>
                Hệ thống Y tế Thu Cúc cơ sở 4
              </h6>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>
                Hệ thống Y tế Thu Cúc cơ sở 5
              </h6>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>
                Hệ thống Y tế Thu Cúc cơ sở 6
              </h6>
            </div>
          </Slider>
        </div>
      </Container>
    </div>
  )
}

export default MedicalFacility
