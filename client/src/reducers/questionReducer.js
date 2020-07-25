import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ALL_QUESTIONS':
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case 'FETCH_QUESTIONS':
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case 'FETCH_QUESTION':
      return { ...state, [action.payload.id]: action.payload };
    case 'DELETE_QUESTION':
      return _.omit(state, action.payload);
    case 'CREATE_QUESTION':
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
