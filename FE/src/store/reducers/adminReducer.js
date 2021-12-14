import actionTypes from "../actions/actionTypes"

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allRequiredDoctorInfor: [],
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        isLoadingGender: true,
      }
    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        listGenders: action.data,
        isLoadingGender: false,
      }
    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
        isLoadingGender: false,
      }
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
        isLoadingPosition: true,
      }
    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        listPositions: action.data,
        isLoadingPosition: false,
      }
    case actionTypes.FETCH_POSITION_FAILED:
      return {
        ...state,
        isLoadingPosition: false,
      }
    case actionTypes.FETCH_ROLE_START:
      return {
        ...state,
        isLoadingRole: true,
      }
    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        listRoles: action.data,
        isLoadingRole: false,
      }
    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...state,
        isLoadingRole: false,
      }
    case actionTypes.CREATE_NEW_USER:
      return {
        ...state,
      }
    case actionTypes.CREATE_NEW_USER_SUCCESS:
      state.users.push(action.payload.formData)
      return {
        ...state,
        isCreateUser: true,
      }
    case actionTypes.CREATE_NEW_USER_FAILED:
      return {
        ...state,
        isCreateUser: false,
      }
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.data
      return {
        ...state,
      }
    case actionTypes.FETCH_ALL_USER_FAILED:
      return {
        ...state,
      }
    case actionTypes.DELETE_USER_SUCCESS:
      state.users = state.users.filter(
        (item) => item.id !== action.payload.userId
      )
      return {
        ...state,
      }
    case actionTypes.DELETE_USER_FAILED:
      return {
        ...state,
      }
    case actionTypes.SAVE_USER_SUCCESS:
      state.users = state.users.map((item, index) => {
        if (item.id === action.payload?.user?.id) {
          item = action.payload.user
        }
        return item
      })
      return {
        ...state,
      }
    case actionTypes.SAVE_USER_FAILED:
      return {
        ...state,
      }
    case actionTypes.FETCH_TOP_DOCTORSS_SUCCESS:
      state.topDoctors = action.dataDoctors
      return {
        ...state,
      }
    case actionTypes.FETCH_TOP_DOCTORSS_FAILED:
      state.topDoctors = []
      return {
        ...state,
      }
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.allDoctors
      return {
        ...state,
      }
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = []
      return {
        ...state,
      }
    case actionTypes.SAVE_INFO_DOCTOR_SUCCESS:
      return {
        ...state,
      }
    case actionTypes.SAVE_INFO_DOCTOR_FAILED:
      return {
        ...state,
      }
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime
      return {
        ...state,
      }
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      return {
        ...state,
      }
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.allRequiredDoctorInfor = action.data
      return {
        ...state,
      }
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
      state.allRequiredDoctorInfor = []
      return {
        ...state,
      }
    default:
      return state
  }
}

export default adminReducer
