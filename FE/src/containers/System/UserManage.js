import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import userService from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from "../../utils/emitter"


class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    async componentDidMount() {
        await this.getAllUsers()
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await userService.createNewUserService(data)
            if (response && response.errCode === 0) {
                await this.getAllUsers()
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {

        }
    }

    getAllUsers = async () => {
        let response = await userService.getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.data
            })
        }
    }

    handleDeleteUser = async (item) => {
        try {
            let res = await userService.deleteUserService(item.id)
            if (res && res.errCode === 0) {
                await this.getAllUsers()
            } else {
                console.log(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        console.log('check render', this.state)
        const { arrUsers } = this.state

        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggle={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <h2 className="title text-center">Manager users</h2>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i class="fas fa-plus mr-1"></i>
                        Add new users
                    </button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="users">
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {
                            arrUsers && arrUsers.length && arrUsers.map((item, index) =>
                            (<tr key={item.id}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className="btn-edit mx-1">
                                        <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className="btn-delete mx-1"
                                        onClick={() => this.handleDeleteUser(item)}
                                    >
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>)
                            )
                        }
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
