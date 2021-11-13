import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import userService from '../../services/userService';

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {
        let response = await userService.getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.data
            }, () => {
                console.log('get user from node .js :', this.state.arrUsers)
            })
        }
    }


    render() {
        console.log('check render', this.state)
        const { arrUsers } = this.state

        return (
            <div className="user-container">
                <h2 className="title text-center">Manager users</h2>
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
                                    <button className="btn-edit">
                                        <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className="btn-delete">
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
