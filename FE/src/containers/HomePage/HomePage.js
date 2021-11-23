import clsx from "clsx";
import Header from "./Header";
import styles from "./HomePage.module.scss"
import { dispatch } from "../../redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Specialty from "./section/Specialty";

function HomePage() {
  console.log(styles)
  return (
    <div className={styles.homePage}>
      <Header />
      <Specialty />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
