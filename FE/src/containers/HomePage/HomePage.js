import clsx from "clsx"
import Header from "./Header"
import styles from "./HomePage.module.scss"
import { dispatch } from "../../redux"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import Specialty from "./section/Specialty"
import MedicalFacility from "./section/MedicalFacility"
import OutStandingDotor from "./section/OutStandingDoctor"
import HandBook from "./section/HandBook"
import Footer from "../../components/Footer/Footer"

function HomePage() {
  return (
    <div className={styles.homePage}>
      <Header isShowBanner={true} />
      <Specialty />
      <MedicalFacility />
      <OutStandingDotor />
      {/* <HandBook /> */}
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
