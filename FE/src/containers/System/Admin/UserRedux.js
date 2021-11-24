import clsx from 'clsx';
import React, { Component, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styles from "./UserRedux.module.scss"
import { Form, Row, Col, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import { getAllCodeService } from "../../../services/userService"

function UserRedux(props) {
    useEffect(() => {
        try {

        } catch (e) {
            throw new Error(e)
        }
    }, [])

    return (
        <div className={styles.userRedux, "container"}>
            <h2 className="title text-center">Manager users</h2>
            <div className={styles.userForm}>
                <Form>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="email">
                                    <FormattedMessage id="user-manage.email" />
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder=""
                                    type="email"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="password">
                                    <FormattedMessage id="user-manage.password" />
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder=""
                                    type="password"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="first-name">
                                    <FormattedMessage id="user-manage.first-name" />
                                </Label>
                                <Input
                                    id="first-name"
                                    name="first-name"
                                    placeholder=""
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="last-name">
                                    <FormattedMessage id="user-manage.last-name" />
                                </Label>
                                <Input
                                    id="last-name"
                                    name="last-name"
                                    placeholder=""
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="phone">
                                    <FormattedMessage id="user-manage.phone" />
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={9}>
                            <FormGroup>
                                <Label for="address">
                                    <FormattedMessage id="user-manage.address" />
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="gender">
                                    <FormattedMessage id="user-manage.gender" />
                                </Label>
                                <Input
                                    id="gender"
                                    name="gender"
                                    type="select"
                                >
                                    <option>
                                        1
                                    </option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="position">
                                    <FormattedMessage id="user-manage.position" />
                                </Label>
                                <Input
                                    id="position"
                                    name="position"
                                    type="select"
                                >
                                    <option>
                                        1
                                    </option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="role">
                                    <FormattedMessage id="user-manage.role" />
                                </Label>
                                <Input
                                    id="role"
                                    name="role"
                                    type="select"
                                >
                                    <option>
                                        1
                                    </option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="file">
                                    <FormattedMessage id="user-manage.file" />
                                </Label>
                                <br />
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button className="mt-3" color="primary">
                        <FormattedMessage id="user-manage.add" />
                    </Button>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
