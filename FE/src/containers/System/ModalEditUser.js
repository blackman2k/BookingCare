import React, { Component } from "react"
import { FormattedMessage } from "react-intl"
import { connect } from "react-redux"
import { Modal } from "react-bootstrap"
import { Button } from "react-bootstrap"

class ModalEditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    }
  }

  componentDidMount() {}

  handleToggleModal = () => {
    this.props.toggle()
  }

  handleOnChangeInput = (e, keyState) => {
    this.setState({
      [keyState]: e.target.value,
    })
  }

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput()
    if (isValid === true) {
      this.props.createNewUser(this.state)
    }
  }

  checkValidateInput = () => {
    let isValide = true
    let arrInput = ["email", "password", "firstName", "lastName", "address"]
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValide = false
        alert("Missing parameter: " + arrInput[i])
        break
      }
    }
    return isValide
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.handleToggleModal()}
        size="xl"
        className="modal-user-container"
      >
        <Modal.Header toggle={() => this.handleToggleModal()}>
          Edit a new user
        </Modal.Header>
        <Modal.Body>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, "email")}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => this.handleOnChangeInput(e, "password")}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label>First name</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last name</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container">
              <label>Address</label>
              <input
                type="text"
                onChange={(e) => this.handleOnChangeInput(e, "address")}
                value={this.state.address}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleAddNewUser()}
          >
            Add new
          </Button>{" "}
          <Button className="px-3" onClick={() => this.handleToggleModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser)
