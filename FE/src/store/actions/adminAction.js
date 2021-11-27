import actionTypes from './actionTypes'
import userService from "../../services/userService"
import { dispatch } from '../../redux'

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCH_GENDER_START })

        try {
            let res = await userService.getAllCodeService("GENDER");
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
    data: data
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCH_POSITION_START })

        try {
            let res = await userService.getAllCodeService("POSITION");
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
    data: data
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCH_ROLE_START })

        try {
            let res = await userService.getAllCodeService("ROLE");
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
    data: data
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (formData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.CREATE_NEW_USER })

        try {
            let res = await userService.createNewUserService(formData)
            if (res && res.errCode === 0) {
                dispatch(createNewUserSuccess())
            } else {
                dispatch(createNewUserFailed())
            }
        } catch (e) {
            dispatch(createNewUserFailed())
        }
    }
}

export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_NEW_USER_SUCCESS
})
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_NEW_USER_FAILED
})