import { reject } from "lodash";
import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("/api/login", {
    email,
    password,
  });
};

const getAllUsers = (id) => {
  return axios.get(`/api/get-all-users`, {
    params: {
      id,
    },
  });
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const editUserService = (data) => {
  return axios.put("/api/edit-user", data);
};

const userService = {
  handleLogin,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
};

export default userService;
