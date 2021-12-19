import clsx from "clsx"
import React, { Component, useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"
import { connect } from "react-redux"
import styles from "./UserRedux.module.scss"
import { Form, Row, Col, Button } from "react-bootstrap"
import * as actions from "../../../store/actions/adminAction"
import userService from "../../../services/userService"
import { LANGUAGES } from "../../../utils"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css" // This only needs to be imported once in your app
import TableUserManage from "./TablesUserManage"
import { CommonUtils } from "../../../utils"

const initialFormData = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  gender: "",
  role: "",
  position: "",
  phoneNumber: "",
  password: "",
  avatar: "",
}

function UserRedux(props) {
  const [listGenders, setListGender] = useState([])
  const [listPositions, setListPositions] = useState([])
  const [listRoles, setListRoles] = useState([])
  const [LANGUAGES, setLanguages] = useState("")
  const [isLoading, setLoading] = useState(true)
  const [previewAvaUrl, setPreviewAavUrl] = useState("")
  const [isOpenPreview, setIsOpenPreview] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [isEdit, setIsEdit] = useState(false)
  const [file, setFile] = useState("")
  useEffect(() => {
    props.getGenderStart()
    props.getPositionStart()
    props.getRoleStart()
    setLoading(true)
  }, [])

  useEffect(() => {
    setListGender(props.listGenders)
    setLoading(false)
    setFormData({
      ...formData,
      gender:
        props.listGenders && props.listGenders.length > 0
          ? props.listGenders[0].keyMap
          : "",
    })
  }, [props.listGenders])
  useEffect(() => {
    setListPositions(props.listPositions)
    setLoading(false)
    setFormData({
      ...formData,
      position:
        props.listPositions && props.listPositions.length > 0
          ? props.listPositions[0].keyMap
          : "",
    })
  }, [props.listPositions])
  useEffect(() => {
    setListRoles(props.listRoles)
    setLoading(false)
    setFormData({
      ...formData,
      role:
        props.listRoles && props.listRoles.length > 0
          ? props.listRoles[0].keyMap
          : "",
    })
  }, [props.listRoles])
  useEffect(() => {
    setLanguages(props.LANGUAGES)
  }, [props.LANGUAGES])
  useEffect(() => {
    setLoading(props.isLoading)
  }, [props.isLoading])

  const handleOnchageImage = async (e) => {
    let file = e.target.files[0]
    if (file) {
      let base64 = await CommonUtils.getBase64(file)
      let avaUrl = URL.createObjectURL(file)
      setPreviewAavUrl(avaUrl)
      setFormData({
        ...formData,
        avatar: base64,
      })
    }
  }

  const handleSaveUser = (e) => {
    let result = validateFormData()
    if (result) {
      if (isEdit) {
        props.saveUser(formData)
      } else {
        props.createNewUser(formData)
      }
    }
    setToOriginalState()
  }

  const handleOnChangeInput = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.target.value,
    })
  }

  const validateFormData = () => {
    let isValid = true
    for (let key in formData) {
      if (!formData[key]) {
        if (key !== "avatar") isValid = false
      }
    }
    return isValid
  }

  const handleEditUser = (user) => {
    let userEdit = formatUserServiceToFormData(user)
    userEdit.id = user.id
    let imageBase64 = ""
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary")
    }
    setPreviewAavUrl(imageBase64)
    setFormData(userEdit)
    setIsEdit(true)
  }

  const formatUserServiceToFormData = (user) => {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      phoneNumber: user.phonenumber,
      password: "hhhhhhhh",
      avatar: user.avatar,
    }
  }

  const setToOriginalState = () => {
    setFormData({
      ...initialFormData,
      gender:
        props.listGenders && props.listGenders.length > 0
          ? props.listGenders[0].keyMap
          : "",
      position:
        props.listPositions && props.listPositions.length > 0
          ? props.listPositions[0].keyMap
          : "",
      role:
        props.listRoles && props.listRoles.length > 0
          ? props.listRoles[0].keyMap
          : "",
    })
    setPreviewAavUrl("")
    setIsEdit(false)
    setFile("")
  }

  return (
    <div className={(styles.userRedux, "container")}>
      <h2 className="title text-center mt-3">
        <FormattedMessage id="user-manage.title" />
      </h2>
      <h4>
        {isEdit ? (
          <FormattedMessage id="user-manage.title-form-edit" />
        ) : (
          <FormattedMessage id="user-manage.title-form-add" />
        )}
      </h4>
      <div className={clsx(styles.userForm, "mb-3")}>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>
                <FormattedMessage id="user-manage.email" />
              </Form.Label>
              <Form.Control
                id="email"
                name="email"
                placeholder=""
                type="email"
                value={formData?.email}
                disabled={isEdit}
                onChange={(e) => {
                  handleOnChangeInput(e, "email")
                }}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <FormattedMessage id="user-manage.password" />
              </Form.Label>
              <Form.Control
                id="password"
                name="password"
                placeholder=""
                type="password"
                value={formData?.password}
                disabled={isEdit}
                onChange={(e) => {
                  handleOnChangeInput(e, "password")
                }}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <FormattedMessage id="user-manage.first-name" />
              </Form.Label>
              <Form.Control
                id="first-name"
                name="first-name"
                placeholder=""
                value={formData?.firstName}
                onChange={(e) => {
                  handleOnChangeInput(e, "firstName")
                }}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <FormattedMessage id="user-manage.last-name" />
              </Form.Label>
              <Form.Control
                id="last-name"
                name="last-name"
                placeholder=""
                value={formData?.lastName}
                onChange={(e) => {
                  handleOnChangeInput(e, "lastName")
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-3">
              <FormattedMessage id="user-manage.phone" />
              <Form.Control
                id="phoneNumber"
                name="phoneNumber"
                value={formData?.phoneNumber}
                onChange={(e) => {
                  handleOnChangeInput(e, "phoneNumber")
                }}
              />
            </Form.Group>

            <Form.Group as={Col} className="col-md-9">
              <FormattedMessage id="user-manage.address" />
              <Form.Control
                id="address"
                name="address"
                value={formData?.address}
                onChange={(e) => {
                  handleOnChangeInput(e, "address")
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>
                <FormattedMessage id="user-manage.gender" />
              </Form.Label>
              <Form.Select
                id="gender"
                name="gender"
                value={formData?.gender}
                onChange={(e) => {
                  handleOnChangeInput(e, "gender")
                }}
              >
                {listGenders &&
                  listGenders.length > 0 &&
                  listGenders.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {LANGUAGES === "vi" ? item.valueVi : item.valueEn}
                      </option>
                    )
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <FormattedMessage id="user-manage.role" />
              </Form.Label>
              <Form.Select
                id="role"
                name="role"
                value={formData?.role}
                onChange={(e) => {
                  handleOnChangeInput(e, "role")
                }}
              >
                {listRoles &&
                  listRoles.length > 0 &&
                  listRoles.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {LANGUAGES === "vi" ? item.valueVi : item.valueEn}
                      </option>
                    )
                  })}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>
                <FormattedMessage id="user-manage.position" />
              </Form.Label>
              <Form.Select
                id="position"
                name="position"
                value={formData?.position}
                onChange={(e) => {
                  handleOnChangeInput(e, "position")
                }}
                disabled={formData.role!=='R2'}
              >
                {listPositions &&
                  listPositions.length > 0 &&
                  listPositions.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {LANGUAGES === "vi" ? item.valueVi : item.valueEn}
                      </option>
                    )
                  })}
              </Form.Select>
            </Form.Group>
            
          </Row>
          <Row className={clsx(styles.uploadAva, "mb-3")}>
            <Form.Group className="position-relative mb-3">
              <Form.Label>
                <FormattedMessage id="user-manage.file" />
              </Form.Label>
              <Form.Control
                id="file"
                name="file"
                type="file"
                onChange={handleOnchageImage}
              />
              {previewAvaUrl && (
                <div
                  className={styles.previewAva}
                  style={{ backgroundImage: `url(${previewAvaUrl})` }}
                  onClick={() => setIsOpenPreview(true)}
                ></div>
              )}
            </Form.Group>
          </Row>

          <Button variant="primary" onClick={handleSaveUser}>
            {isEdit ? (
              <FormattedMessage id="user-manage.edit" />
            ) : (
              <FormattedMessage id="user-manage.add" />
            )}
          </Button>
        </Form>
      </div>
      <TableUserManage handleEditUser={handleEditUser} />
      {isOpenPreview && (
        <Lightbox
          mainSrc={previewAvaUrl}
          onCloseRequest={() => setIsOpenPreview(false)}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    listGenders: state.admin.listGenders,
    listPositions: state.admin.listPositions,
    listRoles: state.admin.listRoles,
    LANGUAGES: state.app.language,
    isLoading:
      state.app.isLoadDingGender ||
      state.app.isLoadingPosition ||
      state.app.isLoadingRole,
    isCreateUser: state.admin.isCreateUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (formData) => dispatch(actions.createNewUser(formData)),
    saveUser: (user) => dispatch(actions.saveUserStart(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
