import React, { Component } from "react"
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"
import styles from "./DetailSpecialty.module.scss"
import Header from "../../HomePage/Header"

export class DetailSpecialty extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Hello world from detail specialty</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty)
