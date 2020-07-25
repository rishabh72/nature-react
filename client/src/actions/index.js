import axios from 'axios';
import history from '../history';

export const searchUser = (query) => {
  return async (dispatch) => {
    const response = await axios.post('/api/v1/users/search', query);
    dispatch({ type: 'SEARCH_USER', payload: response.data.data });
  };
};

export const searchBooking = (query) => {
  return async (dispatch) => {
    const response = await axios.post('/api/v1/bookings/search', query);
    dispatch({ type: 'SEARCH_BOOKING', payload: response.data.data });
  };
};

export const emptySearch = () => {
  return {
    type: 'EMPTY',
    payload: {},
  };
};

export const clearError = () => {
  return {
    type: 'CLEAR_ERROR',
  };
};

export const fetchCurrentUser = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/v1/users/current_user');
    dispatch({ type: 'FETCH_CURRENT_USER', payload: response.data.data });
  };
};

export const updateCurrentUser = (formValues) => {
  return async (dispatch) => {
    const response = await axios.patch('/api/v1/users/updateMe', formValues);
    dispatch({ type: 'UPDATE_CURRENT_USER', payload: response.data.data });
  };
};
export const updateCurrentUserPasword = (formValues) => {
  return async (dispatch) => {
    const response = await axios.patch(
      '/api/v1/users/updateMyPassword',
      formValues
    );
    dispatch({
      type: 'UPDATE_CURRENT_USER_PASSWORD',
      payload: response.data.data,
    });
  };
};
export const getMyBookings = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/bookings/myBookings');
      dispatch({ type: 'MYBOOKINGS', payload: response.data.data });
    } catch (e) {
      dispatch({
        type: 'ERROR_GET_MYBOOKING',
        payload: e.response.data.message,
      });
    }
  };
};

export const getAllBookings = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/v1/bookings');
    dispatch({ type: 'GET_ALL_BOOKINGS', payload: response.data.data.data });
  };
};

export const updateCurrentUserPhoto = (fileName) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch('/api/v1/users/updateImage', fileName);
      dispatch({
        type: 'UPDATE_CURRENT_USER_PHOTO',
        payload: response.data.user,
      });
    } catch (e) {
      dispatch({
        type: 'ERROR_UPDATE_CURRENT_USER_PHOTO',
        payload: e.response.data.message,
      });
    }
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data.data.data });
  };
};

export const editUser = (id, formValues) => {
  return async (dispatch) => {
    const response = await axios.patch(`/api/v1/users/${id}`, formValues);
    dispatch({ type: 'EDIT_USER', payload: response.data.data.data });
    history.push('/users');
  };
};

export const updateUserPhoto = (id, photo) => {
  return async (dispatch) => {
    const response = await axios.patch(`/api/v1/users/image/${id}`, photo);
    dispatch({ type: 'UPDATE_USER_PHOTO', payload: response.data.user });
  };
};

export const fetchAllUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/v1/users');
    dispatch({ type: 'FETCH_USERS', payload: response.data.data.data });
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/v1/users/${id}`);
    dispatch({ type: 'DELETE_USER', payload: id });
    history.push('/users');
  };
};

export const login = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/users/login', formValues);

      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.data.user });
      history.push('/');
    } catch (e) {
      dispatch({ type: 'LOGIN_ERROR', payload: e.response.data.message });
      //console.log(e.response.data);
    }
  };
};

export const signup = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/users/signup', formValues);
      console.log(response.data);
      dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data.data.user });
      history.push('/');
    } catch (e) {
      dispatch({ type: 'SIGNUP_ERROR', payload: e.response.data.message });
    }
  };
};

export const resetPassword = (token, formValues) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `/api/v1/users/resetPassword/${token}`,
        formValues
      );
      dispatch({ type: 'RESET_PASSWORD', payload: response.data.data.user });
      history.push('/');
    } catch (e) {
      dispatch({
        type: 'RESET_PASSWORD_TOKEN_EXPIRED',
        payload: e.response.data.message,
      });
    }
  };
};

export const forgotPassword = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        '/api/v1/users/forgotPassword',
        formValues
      );
      dispatch({ type: 'FORGOT_PASSWORD', payload: response.data.message });
    } catch (e) {
      dispatch({
        type: 'FORGOT_PASSWORD_ERROR',
        payload: e.response.data.message,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    await axios.post('/api/v1/users/logout');
    dispatch({ type: 'LOGOUT_SUCCESS' });
    history.push('/');
  };
};

export const filterTour = (string) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/tours?${string}`);
    dispatch({ type: 'FILTER_TOUR', payload: response.data.data.data });
  };
};

export const fetchTours = () => {
  return async (dispatch) => {
    const response = await axios.get(
      '/api/v1/tours?sort=price&sort=-ratingsAverage'
    );
    dispatch({ type: 'FETCH_TOURS', payload: response.data.data.data });
  };
};
export const uploadTourImages = (id, formValues) => {
  return async (dispatch) => {
    const response = await axios.patch(
      `/api/v1/tours/images/${id}?editTourImages=true`,
      formValues
    );
    dispatch({ type: 'UPLOAD_TOUR_IMAGES', payload: response.data.tour });
    history.push('/');
  };
};

export const updateTourImages = (id, formValues) => {
  return async (dispatch) => {
    const response = await axios.patch(
      `/api/v1/tours/images/${id}`,
      formValues
    );
    dispatch({ type: 'UPLOAD_TOUR_IMAGES', payload: response.data.tour });
  };
};

export const deleteQuestion = (questionId) => {
  return async (dispatch) => {
    await axios.delete(`/api/v1/questions/${questionId}`);
    dispatch({ type: 'DELETE_QUESTION', payload: questionId });
  };
};

export const createQuestion = (formValues) => {
  return async (dispatch, getState) => {
    const response = await axios.post(`/api/v1/questions`, formValues);
    dispatch({ type: 'CREATE_QUESTION', payload: response.data.data.data });
    console.log(getState());
    history.push(`/help/user/${getState().auth._id}`);
  };
};

export const fetchQuestion = (questionId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/questions/${questionId}`);
    dispatch({ type: 'FETCH_QUESTION', payload: response.data.data.data });
  };
};

export const fetchAllQuestions = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/v1/questions');
    dispatch({ type: 'FETCH_QUESTIONS', payload: response.data.data.data });
  };
};

export const fetchQuestions = (userId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/questions?user=${userId}`);
    dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: response.data.data.data });
  };
};

export const createAnswer = (formValues, questionId) => {
  return async (dispatch) => {
    const response = await axios.post(
      `/api/v1/answers/${questionId}`,
      formValues
    );
    dispatch({ type: 'CREATE_ANSWER', payload: response.data.data.data });
  };
};

export const fetchAnswers = (questionId) => {
  return async (dispatch) => {
    const response = await axios.get(
      `/api/v1/answers?question=${questionId}&sort=-createdAt`
    );
    dispatch({ type: 'FETCH_ANSWERS', payload: response.data.data.data });
  };
};
export const fetchAnswer = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/answers/${id}`);
    dispatch({ type: 'FETCH_ANSWER', payload: response.data.data.data });
  };
};
export const editAnswer = (answerId, formValues) => {
  return async (dispatch) => {
    const response = await axios.patch(
      `/api/v1/answers/${answerId}`,
      formValues
    );
    dispatch({ type: 'EDIT_ANSWER', payload: response.data.data.data });
    history.goBack();
  };
};

export const deleteAnswer = (answerId) => {
  return async (dispatch) => {
    await axios.delete(`/api/v1/answers/${answerId}`);
    dispatch({ type: 'DELETE_ANSWER', payload: answerId });
  };
};

export const fetchTour = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/tours/${id}`);
    dispatch({ type: 'FETCH_TOUR', payload: response.data.data.data });
  };
};
export const createTour = (formValues) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/tours', formValues);
      dispatch({ type: 'CREATE_TOUR', payload: response.data.data.data });
    } catch (e) {
      dispatch({ type: 'CREATE_TOUR_ERROR', payload: e.response.data.message });
    }
  };
};

export const editTour = (id, formValues) => {
  return async (dispatch) => {
    const response = await axios.patch(`/api/v1/tours/${id}`, formValues);
    dispatch({ type: 'EDIT_TOUR', payload: response.data.data.data });
    history.push('/');
  };
};

export const deleteTour = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/v1/tours/${id}`);
    dispatch({ type: 'DELETE_TOUR', payload: id });
    history.push('/');
  };
};
export const fetchTourReviews = (tourId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/tours/${tourId}/reviews`);
    dispatch({ type: 'FETCH_TOUR_REVIEWS', payload: response.data.data.data });
  };
};

export const fetchReview = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/v1/reviews/${id}`);
    dispatch({ type: 'FETCH_REVIEW', payload: response.data.data.data });
  };
};

export const createReview = (formValues, tourId) => {
  return async (dispatch) => {
    const response = await axios.post(
      `/api/v1/tours/${tourId}/reviews`,
      formValues
    );
    dispatch({ type: 'CREATE_REVIEW', payload: response.data.data.data });
    setTimeout(() => {
      history.goBack();
    }, 3000);
  };
};

export const editReview = (id, formValues) => {
  return async (dispatch) => {
    const response = await axios.patch(`/api/v1/reviews/${id}`, formValues);
    dispatch({ type: 'EDIT_REVIEW', payload: response.data.data.data });
    history.goBack();
  };
};

export const deleteReview = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/v1/reviews/${id}`);
    dispatch({ type: 'DELETE_REVIEW', payload: id });
    history.goBack();
  };
};
