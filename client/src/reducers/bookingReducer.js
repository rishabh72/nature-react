import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'MYBOOKINGS':
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case 'GET_ALL_BOOKINGS':
      return [...action.payload];
    case 'LOGOUT_SUCCESS':
      return {};

    default:
      return state;
  }
};
