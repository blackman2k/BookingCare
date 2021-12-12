import React, { Component } from "react"
import { Container, Button } from "react-bootstrap"
import styles from "./HeaderDetail.module.scss"

export default class HeaderDetail extends Component {
  render() {
    return (
      <div className={styles.containerHeader}>
        <Container>
          <Button as="p"></Button>
        </Container>
      </div>
    )
  }
}
