import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ANSWERS':
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case 'FETCH_ANSWER':
      return { ...state, [action.payload._id]: action.payload };
    case 'EDIT_ANSWER':
      return { ...state, [action.payload._id]: action.payload };
    case 'CREATE_ANSWER':
      return { ...state, [action.payload._id]: action.payload };
    case 'DELETE_ANSWER':
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
