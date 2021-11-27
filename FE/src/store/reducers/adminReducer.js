import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                listGenders: action.data,
                isLoadingGender: false
            }
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
                isLoadingGender: false
            }
        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
                isLoadingPosition: true
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                listPositions: action.data,
                isLoadingPosition: false
            }
        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
                isLoadingPosition: false
            }
        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
                isLoadingRole: true
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                listRoles: action.data,
                isLoadingRole: false
            }
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
                isLoadingRole: false
            }
        case actionTypes.CREATE_NEW_USER:
            return {
                ...state,
            }
        case actionTypes.CREATE_NEW_USER_SUCCESS:
            return {
                ...state,
                isAddUserSuccess: true
            }
        case actionTypes.CREATE_NEW_USER_FAILED:
            return {
                ...state,
                isAddUserSuccess: false
            }
        default:
            return state;
    }

}

export default adminReducer;