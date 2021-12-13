import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect, Route, Switch } from "react-router"
import MangeSchedule from "../containers/System/Doctor/MangeSchedule"
import Header from "../containers/Header/Header"

export class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/doctor/manage-schedule" component={MangeSchedule} />
            </Switch>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  systemMenuPath: state.app.systemMenuPath,
  isLoggedIn: state.user.isLoggedIn,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Doctor)
