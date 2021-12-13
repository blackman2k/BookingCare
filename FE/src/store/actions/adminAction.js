import actionTypes from "./actionTypes"
import userService from "../../services/userService"
import { dispatch } from "../../redux"
import { toast } from "react-toastify"

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_GENDER_START })

    try {
      let res = await userService.getAllCodeService("GENDER")
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data))
      } else {
        dispatch(fetchGenderFailed())
      }
    } catch (e) {
      dispatch(fetchGenderFailed())
    }
  }
}
export const fetchGenderSuccess = (data) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: data,
})
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
})
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_POSITION_START })

    try {
      let res = await userService.getAllCodeService("POSITION")
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data))
      } else {
        dispatch(fetchPositionFailed())
      }
    } catch (e) {
      dispatch(fetchPositionFailed())
    }
  }
}
export const fetchPositionSuccess = (data) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: data,
})
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
})
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_ROLE_START })

    try {
      let res = await userService.getAllCodeService("ROLE")
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data))
      } else {
        dispatch(fetchRoleFailed())
      }
    } catch (e) {
      dispatch(fetchRoleFailed())
    }
  }
}
export const fetchRoleSuccess = (data) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: data,
})
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
})

export const createNewUser = (formData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_NEW_USER })

    try {
      let res = await userService.createNewUserService(formData)
      if (res && res.errCode === 0) {
        toast.success("Thêm người dùng thành công!")
        dispatch(createNewUserSuccess(res.data.user))
      } else {
        toast.error("Thêm người dùng thất bại!")
        dispatch(createNewUserFailed())
      }
    } catch (e) {
      dispatch(createNewUserFailed())
    }
  }
}

export const createNewUserSuccess = (formData) => ({
  type: actionTypes.CREATE_NEW_USER_SUCCESS,
  payload: { formData },
})
export const createNewUserFailed = () => ({
  type: actionTypes.CREATE_NEW_USER_FAILED,
})

export const fetchAllUserStart = () => {
  return async (dispatch) => {
    try {
      let res = await userService.getAllUsers("ALL")
      if (res && res.errCode === 0) {
        console.log("Res: ", res)
        dispatch(fetchAllUserSuccess(res.data))
      } else {
        dispatch(fetchAllUserFailed(res.data))
      }
    } catch (e) {
      dispatch(fetchAllUserFailed(e))
    }
  }
}

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  data,
})
export const fetchAllUserFailed = (data) => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
  data,
})

export const deleteUserStart = (userId) => {
  return async (dispatch) => {
    try {
      let res = await userService.deleteUserService(userId)
      if (res && res.errCode === 0) {
        toast.success("Xóa người dùng thành công!")
        dispatch(deleteUserStartSuccess(userId))
      } else {
        toast.error("Xóa người dùng thất bại!")
        dispatch(deleteUserStartFailed())
      }
    } catch (e) {
      dispatch(deleteUserStartFailed(e))
    }
  }
}

export const deleteUserStartSuccess = (userId) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
  payload: {
    userId,
  },
})
export const deleteUserStartFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
})

export const saveUserStart = (user) => {
  return async (dispatch) => {
    try {
      let res = await userService.editUserService(user)
      if (res && res.errCode === 0) {
        toast.success("Lưu thông tin thành công!")
        dispatch(user)
      } else {
        toast.error("Lưu thông tin thất bại!")
        dispatch(deleteUserStartFailed())
      }
    } catch (e) {
      dispatch(deleteUserStartFailed(e))
    }
  }
}

export const saveUserStartSuccess = (user) => ({
  type: actionTypes.SAVE_USER_SUCCESS,
  payload: {
    user,
  },
})
export const saveUserStartFailed = () => ({
  type: actionTypes.SAVE_USER_FAILED,
})

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getTopDoctorHomeService("")
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORSS_SUCCESS,
          dataDoctors: res.data,
        })
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORSS_FAILED,
      })
    }
  }
}

export const fetchAllDoctors = () => {
  return async (dispatch) => {
    try {
      let res = await userService.getAllDoctors()
      console.log("Res: ", res)

      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          allDoctors: res.doctors,
        })
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED })
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED })
    }
  }
}
export const saveInforDoctor = (data) => {
  return async (dispatch) => {
    try {
      let res = await userService.saveInfoDoctor(data)

      if (res && res.errCode === 0) {
        toast.success("Lưu thông tin thành công!")

        dispatch({
          type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
        })
      } else {
        toast.error("Lưu thông tin thất bại!")

        dispatch({ type: actionTypes.SAVE_INFO_DOCTOR_FAILED })
      }
    } catch (e) {
      toast.error("Lưu thông tin thất bại!")

      dispatch({ type: actionTypes.SAVE_INFO_DOCTOR_FAILED })
    }
  }
}
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllCodeService("TIME")
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        })
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      })
    }
  }
}
