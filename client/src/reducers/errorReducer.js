export default (state = {}, action) => {
  switch (action.type) {
    case 'ERROR_UPDATE_CURRENT_USER_PHOTO':
      return {
        ...state,
        ErrorOnupdateCurrentUserPhoto: action.payload,
      };
    case 'SIGNUP_ERROR':
      return { ...state, signupError: action.payload };
    case 'FORGOT_PASSWORD_ERROR':
      return { forgotPasswordError: action.payload };
    case 'CREATE_TOUR_ERROR':
      return { createTourError: action.payload };
    case 'LOGIN_ERROR':
      return { ...state, loginError: action.payload };
    case 'CLEAR_ERROR':
      return {};
    case 'RESET_PASSWORD_TOKEN_EXPIRED':
      return { resetPasswordTokenExpired: action.payload };
    case 'ERROR_GET_MYBOOKING':
      return { errGetMyBooking: action.payload };
    case 'LOGIN_SUCCESS':
      return {};
    case 'SIGNUP_SUCCESS':
      return {};
    default:
      return state;
  }
};
