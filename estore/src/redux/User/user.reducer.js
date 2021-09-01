import userTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  resetPasswordSuccess: false,
  userErr: []
};

// Reducer is used to change the state according to the action
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        // This is spead operator(...), Used to make a copy of state so that we can only change the property we want. 
        // This will not affect the other properties
        ...state,
        currentUser: action.payload,
        userErr: []
      }
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload
      }
    case userTypes.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...action.payload.currentUser,
          displayName: action.payload.userName,
          phone: action.payload.phone,
          profileImage: action.payload.profileImageUrl
        }
      }
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload
      }
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE
      }
    default:
      return state;
  }
};

export default userReducer;