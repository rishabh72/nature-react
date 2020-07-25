export default (state = {}, action) => {
  switch (action.type) {
    case 'FORGOT_PASSWORD':
      return { msg: action.payload };
    case 'CREATE_TOUR':
      return { tourId: action.payload.id };
    default:
      return state;
  }
};
