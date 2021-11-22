import clsx from "clsx";
import Header from "./Header";
import styles from "./HomePage.module.scss"
import { FaTooth,FaHeadSideVirus } from 'react-icons/fa'

function HomePage() {
  return (
    <div className={styles.homePage}>
      <Header />
      <div className={styles.homePageContent}>
        <div className={styles.bannerHomePage}>
          <div className={styles.content}>
            <div className={styles.title}>
              <h2>NỀN TẢNG Y TẾ <br/> <b>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</b></h2>
            </div>
            <div className={styles.search}>
              <input type="text" placeholder="Nhập nội dung tìm kiếm" />
              <i class="fas fa-search"></i>
            </div>
            <div className={styles.listOptions}>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <i className="fas fa-hospital"></i>
                </div>
                <p className={styles.titleOptions}>
                  Khám Chuyên khoa
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <i class="fas fa-mobile"></i>
                </div>
                <p className={styles.titleOptions}>
                  Khám từ xa
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <i class="fas fa-notes-medical"></i>
                </div>
                <p className={styles.titleOptions}>
                  Khám tổng quát
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <i class="fas fa-vial"></i>
                </div>
                <p className={styles.titleOptions}>
                  Xét nghiệm y học
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <FaHeadSideVirus />
                </div>
                <p className={styles.titleOptions}>
                  Sức khỏe tinh thần
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <FaTooth />
                </div>
                <p className={styles.titleOptions}>
                  Khám nha khoa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
