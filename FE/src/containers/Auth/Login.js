import React, { Component } from "react"
import { connect } from "react-redux"
import { push } from "connected-react-router"

import * as actions from "../../store/actions"
import "./Login.scss"
import { times } from "lodash"

import { userService } from "../../services"
import { userLoginSuccess } from "../../store/actions"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    }
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    })
  }
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    })
  }

  handleLogin = async (event) => {
    this.setState({
      errMessage: "",
    })
    try {
      const result = await userService.handleLogin(
        this.state.username,
        this.state.password
      )
      if (result && result.errCode !== 0) {
        this.setState({
          errMessage: result.message,
        })
      }
      if (result && result.errCode === 0) {
        this.props.userLoginSuccess(result.data)
        console.log("Login succesd")
      }
    } catch (e) {
      this.setState({
        errMessage: e.response.data.message,
      })
    }
  }

  handleClickShowPassword = () => {
    this.setState((prev) => ({
      isShowPassword: !prev.isShowPassword,
    }))
  }

  render() {
    return (
      <div className="login">
        <div className="login-container">
          <form className="login-content">
            <h2 className="text-center">Welcome Back</h2>
            <p className="text-center">
              Enter your credentials to access your account
            </p>
            <div className="form-group">
              <div className="icon-container">
                <i className="fas fa-user"></i>
              </div>
              <input
                type="text"
                name="username"
                placeholder="Enter your email"
                value={this.state.username}
                onChange={(event) => {
                  this.handleOnChangeUsername(event)
                }}
              />
            </div>
            <div className="form-group">
              <div className="icon-container">
                <i
                  className={
                    this.state.isShowPassword
                      ? "fas fa-lock-open"
                      : "fas fa-lock"
                  }
                  onClick={(event) => {
                    this.handleClickShowPassword()
                  }}
                ></i>
              </div>
              <input
                type={this.state.isShowPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={(event) => {
                  this.handleOnChangePassword(event)
                }}
              />
            </div>
            {this.state.errMessage && (
              <span className="error-message">{this.state.errMessage}</span>
            )}
            <button
              type="button"
              onClick={(event) => {
                this.handleLogin(event)
              }}
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="login-options">
          <p>
            Forgot your password? <a>Reset password</a>
          </p>

          {/* <div className="social-login">
                        <p>Or sign up with</p>
                        <div class="social-login-wrap">
                            <a>
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a>
                                <i className="fab fa-google-plus"></i>
                            </a>
                        </div>
                    </div> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
