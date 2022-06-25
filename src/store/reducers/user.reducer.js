import { USER_CLEAR, USER_LOGGED_IN, USER_UPDATE_DATA } from "../actions";
const initialState = {
  accessToken: null,
  data: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        data: payload.data,
        accessToken: payload.accessToken,
      };

    case USER_UPDATE_DATA:
      return {
        ...state,
        data: payload,
      };

    case USER_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
