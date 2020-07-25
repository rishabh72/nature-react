import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case 'FETCH_USER':
      return { ...state, [action.payload._id]: action.payload };
    case 'EDIT_USER':
      return { ...state, [action.payload._id]: action.payload };
    case 'UPDATE_USER_PHOTO':
      return { ...state, [action.payload._id]: action.payload };
    case 'DELETE_USER':
      return _.omit(state, action.payload);
    case 'SEARCH_USER':
      return { ..._.mapKeys(action.payload, '_id') };

    default:
      return state;
  }
};
