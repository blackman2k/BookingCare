import styles from "./Section.module.scss"
import Slider from "react-slick"
import clsx from "clsx"
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

function HandBook() {
  console.log("styles: ", styles)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <div className={clsx(styles.sectionsHomePage, styles.handBook)}>
      <Container>
        <div className={styles.headerSection}>
          <h3 className={styles.titleHeader}>Cẩm nang</h3>
          <button className={styles.btnMoreInfo}>XEM THÊM</button>
        </div>
        <div className={styles.bodySection}>
          <Slider {...settings}>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <p className={styles.titleHandbook}>
                9 Phòng khám Răng uy tín tại TP.HCM - Review Nha khoa
              </p>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <p className={styles.titleHandbook}>
                9 Phòng khám Răng uy tín tại TP.HCM - Review Nha khoa
              </p>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <p className={styles.titleHandbook}>
                9 Phòng khám Răng uy tín tại TP.HCM - Review Nha khoa
              </p>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <p className={styles.titleHandbook}>
                9 Phòng khám Răng uy tín tại TP.HCM - Review Nha khoa
              </p>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <p className={styles.titleHandbook}>
                9 Phòng khám Răng uy tín tại TP.HCM - Review Nha khoa
              </p>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <p className={styles.titleHandbook}>
                9 Phòng khám Răng uy tín tại TP.HCM - Review Nha khoa
              </p>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <p className={styles.titleHandbook}>
                9 Phòng khám Răng uy tín tại TP.HCM - Review Nha khoa
              </p>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <p className={styles.titleHandbook}>
                9 Phòng khám Răng uy tín tại TP.HCM - Review Nha khoa
              </p>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <p className={styles.titleHandbook}>
                9 Phòng khám Răng uy tín tại TP.HCM - Review Nha khoa
              </p>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <p className={styles.titleHandbook}>
                9 Phòng khám Răng uy tín tại TP.HCM - Review Nha khoa
              </p>
            </div>
          </Slider>
        </div>
      </Container>
    </div>
  )
}

export default HandBook
