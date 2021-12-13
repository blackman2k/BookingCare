import React, { Component } from "react"
import { connect } from "react-redux"

export class MangeSchedule extends Component {
  render() {
    return (
      <div>
        <div>manage schedule</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MangeSchedule)
