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

function Specialty() {
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
          <h3 className={styles.titleHeader}>Chuyên khoa phổ biến</h3>
          <button className={styles.btnMoreInfo}>XEM THÊM</button>
        </div>
        <div className={styles.bodySection}>
          <Slider {...settings}>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>Cơ Xương Khớp</h6>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>Thần kinh</h6>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>Tiêu hóa</h6>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>Tim mạch</h6>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>Tai Mũi Họng</h6>
            </div>
            <div className={styles.itemSilder}>
              <div className={styles.coverItem}></div>
              <h6 className={styles.titleItem}>Cột sống</h6>
            </div>
          </Slider>
        </div>
      </Container>
    </div>
  )
}

export default Specialty
