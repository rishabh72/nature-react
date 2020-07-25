import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TOUR_REVIEWS':
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case 'FETCH_REVIEW':
      return { ...state, [action.payload.id]: action.payload };
    case 'CREATE_REVIEW':
      return { ...state, [action.payload.id]: action.payload };
    case 'EDIT_REVIEW':
      return { ...state, [action.payload.id]: action.payload };
    case 'DELETE_REVIEW':
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
