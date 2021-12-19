import React, { useEffect, useState } from "react"
import styles from "./TablesUserManage.module.scss"
import { Table, Button } from "react-bootstrap"
import * as actions from "../../../store/actions/adminAction"
import { connect } from "react-redux"

import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
const mdParser = new MarkdownIt(/* Markdown-it options */)
function TableUserManage(props) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    props.fetchUserRedux()

    setUsers([{}])
  }, [])

  useEffect(() => {
    setUsers(props.users)
  }, [props.users])

  return (
    <Table striped bordered hover className="mb-4">
      <thead>
        <tr>
          <th>Email</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.users &&
          props.users.length > 0 &&
          props.users.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => props.handleEditUser(item)}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      props.deleteUser(item.id)
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            )
          })}
      </tbody>
    </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
    isCreateUser: state.admin.isCreateUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUser: (userId) => dispatch(actions.deleteUserStart(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableUserManage)
