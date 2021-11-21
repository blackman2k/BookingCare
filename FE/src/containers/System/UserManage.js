import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import userService from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";

function UserManage() {
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);
  const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
  const [arrUsers, setArrUsers] = useState([]);
  const [userEdit, setUserEdit] = useState({});
  const [method, SetMethod] = useState("add");

  useEffect(async () => {
    await getAllUsers();
  }, []);

  const toggleUserModal = () => {
    setIsOpenModalUser(!isOpenModalUser);
  };
  const toggleEditModal = () => {
    setIsOpenModalEditUser(!isOpenModalEditUser);
  };

  const handleAddNewUser = () => {
    setIsOpenModalUser(true);
    setUserEdit({});
  };

  const createNewUser = async (data) => {
    try {
      let response = await userService.createNewUserService(data);
      if (response && response.errCode === 0) {
        await getAllUsers();
        setIsOpenModalUser(false);
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {}
  };

  const getAllUsers = async () => {
    let response = await userService.getAllUsers("ALL");
    if (response && response.errCode === 0) {
      setArrUsers(response.data);
    }
  };

  const handleDeleteUser = async (item) => {
    try {
      let res = await userService.deleteUserService(item.id);
      if (res && res.errCode === 0) {
        await getAllUsers();
      } else {
        console.log(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditUser = async (user) => {
    setIsOpenModalUser(true);
    setUserEdit(user);
  };

  const editUser = (user) => {
    userService.editUserService(user).then(async (result) => {
      if (result && result.errCode === 0) {
        await getAllUsers();
        setIsOpenModalUser(false);
        // emitter.emit("EVENT_CLEAR_MODAL_DATA");
      } else {
        console.log("Update that bai");
      }
    });
  };
  return (
    <div className="user-container">
      <ModalUser
        isOpen={isOpenModalUser}
        toggle={toggleUserModal}
        createNewUser={createNewUser}
        editUser={editUser}
        userEdit={userEdit}
        method={method}
      />
      <h2 className="title text-center">Manager users</h2>
      <div className="mx-1">
        <button
          className="btn btn-primary px-3"
          onClick={() => handleAddNewUser()}
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
          {arrUsers &&
            arrUsers.length &&
            arrUsers.map((item, index) => (
              <tr key={item.id}>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>
                  <button
                    className="btn-edit mx-1"
                    onClick={() => handleEditUser(item)}
                  >
                    <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button
                    className="btn-delete mx-1"
                    onClick={() => handleDeleteUser(item)}
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
