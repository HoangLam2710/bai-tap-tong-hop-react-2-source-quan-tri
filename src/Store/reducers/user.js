import { actionTypes } from "../actions/types";

const initialState = {
    user: null,
    userList: null,
    open: false,
    isEdit: false,
    userEdit: null,
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_USER:
            state.user = payload;
            return { ...state };
        case actionTypes.SET_USERLIST:
            state.userList = payload;
            return { ...state };
        case actionTypes.SET_OPEN:
            state.open = payload;
            return { ...state };
        case actionTypes.SET_EDIT:
            state.isEdit = payload;
            return { ...state };
        case actionTypes.SET_USER_EDIT:
            state.userEdit = payload;
            return { ...state };
        default:
            return state;
    }
};

export default reducer;
