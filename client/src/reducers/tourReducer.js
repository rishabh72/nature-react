import _ from 'lodash';

export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TOURS':
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case 'FETCH_TOUR':
      return { ...state, [action.payload.id]: action.payload };
    case 'CREATE_TOUR':
      return { ...state, [action.payload.id]: action.payload };
    case 'EDIT_TOUR':
      return { ...state, [action.payload.id]: action.payload };
    case 'DELETE_TOUR':
      return _.omit(state, action.payload);
    case 'SEARCH_TOUR':
      return { ..._.mapKeys(action.payload, 'id') };
    case 'FILTER_TOUR':
      return { ..._.mapKeys(action.payload, 'id') };
    case 'UPLOAD_TOUR_IMAGES':
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};
