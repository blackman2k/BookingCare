import logo from '../../assets/images/hospital.svg'
import styles from './HomePage.module.scss'
import clsx from 'clsx';
import { isClassExpression } from 'typescript';
import {useState} from 'react'
import { FormattedMessage } from 'react-intl';
import { changeLanguage } from '../../store/actions';
import { dispatch } from '../../redux';
import { connect } from 'react-redux';
import { FaTooth,FaHeadSideVirus } from 'react-icons/fa'


function Header(props) {
  const [languageSelect, setLanguageSelect] = useState('vi')

  const handleChangeLanguage = (language) => {
    setLanguageSelect(language)
    props.changeLanguage(language)
  }

  return (
    <div className={clsx(styles.headerContainer)}>
      <div className={clsx(styles.headerWrapper)}>
        <div className={clsx(styles.headerLogo)}>
          <i className="fas fa-bars"></i>
          <div className={styles.headerLogoImage}></div>
        </div>
        <div className={clsx(styles.headerList)}>
          <div className={styles.headerItemList}>
              <p><b><FormattedMessage id="header.speciality" /></b></p>
            <p className={styles.headerSubtitle}><FormattedMessage id='header.searchdoctor' /></p>
          </div>
          <div className={styles.headerItemList}>
            <p><b><FormattedMessage id='header.health-facility' /></b></p>
            <p><FormattedMessage id='header.select-room' /></p>
          </div>
          <div className={styles.headerItemList}>
            <p><b><FormattedMessage id='header.doctor' /></b></p>
            <p><FormattedMessage id='header.select-doctor' /></p>
          </div>
          <div className={styles.headerItemList}>
            <p><b><FormattedMessage id='header.fee' /></b></p>
            <p><FormattedMessage id='header.check-health' /></p>
          </div>
        </div>
        <div className={clsx(styles.headerRight)}>
          <i class="fas fa-question-circle"></i>
          <span><FormattedMessage id='header.support' /></span>
          <div className={styles.languageOptions}>
            <span onClick={() => handleChangeLanguage('vi')} className={clsx({[styles.active]: languageSelect === 'vi'})}>VI</span>
            <span onClick={() => handleChangeLanguage('en')} className={clsx({[styles.active]: languageSelect === 'en'})}>EN</span>
          </div>
        </div>
      </div>
      <div className={styles.bannerHomePage}>
          <div className={styles.content}>
            <div className={styles.title}>
              <h2><FormattedMessage id="banner.title1"/> <br/> <b><FormattedMessage id="banner.title2"/></b></h2>
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
                  <FormattedMessage id="banner.option1"/>
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <i class="fas fa-mobile"></i>
                </div>
                <p className={styles.titleOptions}>
                  <FormattedMessage id="banner.option2"/>
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <i class="fas fa-notes-medical"></i>
                </div>
                <p className={styles.titleOptions}>
                  <FormattedMessage id="banner.option3"/>
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <i class="fas fa-vial"></i>
                </div>
                <p className={styles.titleOptions}>
                  <FormattedMessage id="banner.option4"/>
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <FaHeadSideVirus />
                </div>
                <p className={styles.titleOptions}>
                  <FormattedMessage id="banner.option5"/>
                </p>
              </div>
              <div className={styles.optionItem}>
                <div className={styles.iconOptions}>
                  <FaTooth />
                </div>
                <p className={styles.titleOptions}>
                  <FormattedMessage id="banner.option6"/>
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    language: state.app.language
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeLanguage: (languageSelect) => dispatch(changeLanguage(languageSelect))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
