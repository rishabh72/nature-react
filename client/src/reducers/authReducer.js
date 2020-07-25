export default (state = {}, action) => {
  if (action.type === 'ERROR_UPDATE_CURRENT_USER_PHOTO') {
    console.log(action.payload);
  }
  switch (action.type) {
    case 'FETCH_CURRENT_USER':
      return {
        ...state,
        ...action.payload,
      };
    case 'UPDATE_CURRENT_USER':
      return {
        ...state,

        ...action.payload,
      };
    case 'UPDATE_CURRENT_USER_PASSWORD':
      return {
        ...state,
        ...action.payload,
      };
    case 'UPDATE_CURRENT_USER_PHOTO':
      return {
        ...state,
        ...action.payload,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };
    case 'SIGNUP_SUCCESS':
      return { ...state, ...action.payload };
    case 'LOGOUT_SUCCESS':
      return {};
    case 'RESET_PASSWORD':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
