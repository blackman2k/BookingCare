import logo from '../../assets/images/hospital.svg'
import styles from './HomePage.module.scss'
import clsx from 'clsx';
import { isClassExpression } from 'typescript';

function Header() {
  console.log(styles)
  return (
    <div className={clsx(styles.headerContainer)}>
      <div className={clsx(styles.headerWrapper)}>
        <div className={clsx(styles.headerLogo)}>
          <i className="fas fa-bars"></i>
          <div className={styles.headerLogoImage}></div>
        </div>
        <div className={clsx(styles.headerList)}>
          <div className={styles.headerItemList}>
            <p><b>Chuyên khoa</b></p>
            <p className={styles.headerSubtitle}>Tìm bác sĩ theo chuyên khoa</p>
          </div>
          <div className={styles.headerItemList}>
            <p><b>Cơ sở y tế</b></p>
            <p>Chọn bệnh viện phòng khám</p>
          </div>
          <div className={styles.headerItemList}>
            <p><b>Chuyên khoa</b></p>
            <p>Chọn bác sĩ giỏi</p>
          </div>
          <div className={styles.headerItemList}>
            <p><b>Chuyên khoa</b></p>
            <p>Khám sức khỏe tổng quát</p>
          </div>
        </div>
        <div className={clsx(styles.headerRight)}>
          <i class="fas fa-question-circle"></i>
          <span>Hỗ trợ</span>
        </div>
      </div>
    </div>
  );
}
export default Header;
