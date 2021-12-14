import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./DoctorExtraInfor.module.scss"

export class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowDetailInfor: false,
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    })
  }

  render() {
    const { isShowDetailInfor } = this.state
    return (
      <div className={styles.extranInforCotainer}>
        <div className={styles.contentUp}>
          <p className={styles.titleAdress}>ĐỊA CHỈ KHÁM</p>
          <p className={styles.nameClinic}>Phòng khám chuyên khóa Da Liễu</p>
          <p className={styles.detailAddress}>
            207 Phố Huế - Hai Bà Trưng - Hà Nội
          </p>
        </div>
        <div className={styles.contenDown}>
          {isShowDetailInfor === false && (
            <div className={styles.shortInfor}>
              <p>GIÁ KHÁM: 250.000đ</p>
              <span onClick={() => this.showHideDetailInfor(true)}>
                Xem chi tiết
              </span>
            </div>
          )}
          {isShowDetailInfor === true && (
            <>
              <p className={styles.titlePrice}>GIÁ KHÁM .</p>
              <div className={styles.detailInfor}>
                <span className={styles.left}>Giá khám</span>
                <span className={styles.right}>250.000đ</span>
                <p className={styles.note}>
                  Được ưu tiên khám trước khi đặt khám qua BookingCare
                </p>
              </div>
              <p className={styles.payment}>
                Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt
              </p>
              <div className={styles.hidePrice}>
                <span onClick={() => this.showHideDetailInfor(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor)
