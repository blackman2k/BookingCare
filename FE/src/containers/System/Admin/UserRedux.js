import clsx from 'clsx';
import React, { Component, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styles from "./UserRedux.module.scss"
import { Form, Row, Col, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import * as actions from "../../../store/actions/adminAction"
import userService from "../../../services/userService"
import { languages } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const initialFormData = {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    gender: '',
    role: '',
    position: '',
    phoneNumber: '',
    password: '',
    ava: ''
}

function UserRedux(props) {
    const [listGenders, setListGender] = useState([])
    const [listPositions, setListPositions] = useState([])
    const [listRoles, setListRoles] = useState([])
    const [languages, setLanguages] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [previewAvaUrl, setPreviewAavUrl] = useState('')
    const [isOpenPreview, setIsOpenPreview] = useState(false)
    const [formData, setFormData] = useState(initialFormData)
    console.log("re-render")
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
            gender: props.listGenders && props.listGenders.length > 0 ? props.listGenders[0].key : ''
        })
    }, [props.listGenders])
    useEffect(() => {
        setListPositions(props.listPositions)
        setLoading(false)
        setFormData({
            ...formData,
            position: props.listPositions && props.listPositions.length > 0 ? props.listPositions[0].key : ''
        })
    }, [props.listPositions])
    useEffect(() => {
        setListRoles(props.listRoles)
        setLoading(false)
        setFormData({
            ...formData,
            role: props.listRoles && props.listRoles.length > 0 ? props.listRoles[0].key : ''
        })
    }, [props.listRoles])
    useEffect(() => {
        setLanguages(props.languages)
    }, [props.languages])
    useEffect(() => {
        setLoading(props.isLoading)
    }, [props.isLoading])

    const handleOnchageImage = (e) => {
        let file = e.target.files[0]
        if (file) {
            let avaUrl = URL.createObjectURL(file)
            setPreviewAavUrl(avaUrl)
            setFormData({
                ...formData,
                ava: avaUrl
            })
        }
    }

    const handleSaveUser = (e) => {
        let result = validateFormData()
        if (result) {
            userService.createNewUserService(formData).then((result) => {
                if (result && result.errCode === 0) {
                    console.log("Result: ", result)
                }
            })
        }
    }

    const handleOnChangeInput = (e, type) => {
        setFormData({
            ...formData,
            [type]: e.target.value
        })
    }

    const validateFormData = () => {
        let isValid = true
        for (let key in formData) {
            if (!formData[key]) {
                if (key !== 'ava') isValid = false
            }
        }
        return isValid
    }
    return (
        <div className={styles.userRedux, "container"}>
            <h2 className="title text-center"><FormattedMessage id="user-manage.title" /></h2>
            <h4><FormattedMessage id="user-manage.title-form" /></h4>
            <div className={styles.userForm}>
                <Form>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="email">
                                    <FormattedMessage id="user-manage.email" />
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder=""
                                    type="email"
                                    value={formData?.email}
                                    onChange={(e) => { handleOnChangeInput(e, 'email') }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="password">
                                    <FormattedMessage id="user-manage.password" />
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder=""
                                    type="password"
                                    value={formData?.password}
                                    onChange={(e) => { handleOnChangeInput(e, 'password') }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="first-name">
                                    <FormattedMessage id="user-manage.first-name" />
                                </Label>
                                <Input
                                    id="first-name"
                                    name="first-name"
                                    placeholder=""
                                    value={formData?.firstName}
                                    onChange={(e) => { handleOnChangeInput(e, 'firstName') }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="last-name">
                                    <FormattedMessage id="user-manage.last-name" />
                                </Label>
                                <Input
                                    id="last-name"
                                    name="last-name"
                                    placeholder=""
                                    value={formData?.lastName}
                                    onChange={(e) => { handleOnChangeInput(e, 'lastName') }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="phoneNumber">
                                    <FormattedMessage id="user-manage.phone" />
                                </Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData?.phoneNumber}
                                    onChange={(e) => { handleOnChangeInput(e, 'phoneNumber') }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={9}>
                            <FormGroup>
                                <Label htmlFor="address">
                                    <FormattedMessage id="user-manage.address" />
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData?.address}
                                    onChange={(e) => { handleOnChangeInput(e, 'address') }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="gender">
                                    <FormattedMessage id="user-manage.gender" />
                                </Label>
                                <Input
                                    id="gender"
                                    name="gender"
                                    type="select"
                                    value={formData?.gender}
                                    onChange={(e) => { handleOnChangeInput(e, 'gender') }}
                                >
                                    {listGenders && listGenders.length > 0 && listGenders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {languages === "vi" ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="position">
                                    <FormattedMessage id="user-manage.position" />
                                </Label>
                                <Input
                                    id="position"
                                    name="position"
                                    type="select"
                                    value={formData?.position}
                                    onChange={(e) => { handleOnChangeInput(e, 'position') }}
                                >
                                    {listPositions && listPositions.length > 0 && listPositions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {languages === "vi" ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label htmlFor="role">
                                    <FormattedMessage id="user-manage.role" />
                                </Label>
                                <Input
                                    id="role"
                                    name="role"
                                    type="select"
                                    value={formData?.role}
                                    onChange={(e) => { handleOnChangeInput(e, 'role') }}
                                >
                                    {listRoles && listRoles.length > 0 && listRoles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {languages === "vi" ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Label htmlFor="file">
                                <FormattedMessage id="user-manage.file" />
                            </Label>
                            <FormGroup className={styles.uploadAva}>
                                <Label htmlFor="file" className={styles.labelUpload}>
                                    <FormattedMessage id="user-manage.upload" /> <i className="fas fa-upload"></i>
                                </Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    hidden
                                    onChange={handleOnchageImage}
                                    value={formData?.ava}
                                />
                                {
                                    previewAvaUrl && (
                                        <div
                                            className={styles.previewAva}
                                            style={{ backgroundImage: `url(${previewAvaUrl})` }}
                                            onClick={() => setIsOpenPreview(true)}
                                        >
                                        </div>)
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button
                        className="mt-3"
                        color="primary"
                        onClick={handleSaveUser}
                    >
                        <FormattedMessage id="user-manage.add" />
                    </Button>
                </Form>
            </div>
            {isOpenPreview && (
                <Lightbox
                    mainSrc={previewAvaUrl}
                    onCloseRequest={() => setIsOpenPreview(false)}
                />
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        listGenders: state.admin.listGenders,
        listPositions: state.admin.listPositions,
        listRoles: state.admin.listRoles,
        languages: state.app.language,
        isLoading: state.app.isLoadDingGender || state.app.isLoadingPosition || state.app.isLoadingRole,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (formData) => dispatch(actions.createNewUser(formData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
