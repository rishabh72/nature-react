import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import authReducer from './authReducer';
import tourReducer from './tourReducer';
import userReducer from './userReducer';
import reviewReducer from './reviewReducer';
import notifyReducer from './notifyReducer';
import bookingReducer from './bookingReducer';
import errorReducer from './errorReducer';
import questionReducer from './questionReducer';
import answerReducer from './answerReducer';

export default combineReducers({
  auth: authReducer,
  form: reducer,
  tours: tourReducer,
  users: userReducer,
  reviews: reviewReducer,
  utils: notifyReducer,
  myBookings: bookingReducer,
  error: errorReducer,
  questions: questionReducer,
  answers: answerReducer,
});
