import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './Header';
import Footer from './Footer';
import TourList from './tours/TourList';
import TourCreate from './tours/TourCreate';
import TourEdit from './tours/TourEdit';
import TourShow from './tours/TourShow';
import TourDelete from './tours/TourDelete';

import RateTour from './tours/RateTour';
import ForgotPassword from './users/ForgotPassword';
import ResetPassword from './users/ResetPassword';
import UserList from './users/UserList';
import UserEdit from './users/UserEdit';
import UserImageEdit from './users/UserImageEdit';
import UserDelete from './users/UserDelete';
import myAccount from './account/myAccount';
import ReviewDelete from './reviews/ReviewDelete';
import ReviewEdit from './reviews/ReviewEdit';
import BookingList from './bookings/BookingList';
import BookingShow from './bookings/BookingShow';
import QuestionList from './help/QuestionList';
import QuestionShow from './help/QuestionShow';
import QuestionCreate from './help/QuestionCreate';
import AllQuestions from './help/AllQuestions';
import AnswerEdit from './help/AnswerEdit';
import Login from './users/Login';
import Signup from './users/Signup';
import { Link } from 'react-router-dom';
import history from '../history';

const notFound = () => {
  return (
    <div className="section">
      <div className="subtitle has-text-centered">
        <Link to="/">
          <span className="icon has-text-link">
            <i className="fas fa-home"></i>
          </span>
          <br />
          <div className="has-text-link">Go to Home Page</div>
        </Link>
      </div>
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={TourList} />
              <Route path="/tours/:id" exact component={TourShow} />

              <Route path="/tours" exact component={TourCreate} />
              <Route path="/tours/edit/:id" exact component={TourEdit} />
              <Route path="/tours/delete/:id" exact component={TourDelete} />

              <Route path="/users" exact component={UserList} />
              <Route path="/users/edit/:id" exact component={UserEdit} />
              <Route path="/users/delete/:id" exact component={UserDelete} />
              <Route path="/users/image/:id" exact component={UserImageEdit} />
              <Route
                path="/users/forgot-password"
                exact
                component={ForgotPassword}
              />
              <Route
                path="/users/resetPassword/:token"
                exact
                component={ResetPassword}
              />
              <Route path="/account" exact component={myAccount} />

              <Route
                path="/reviews/delete/:id"
                exact
                component={ReviewDelete}
              />
              <Route path="/reviews/edit/:id" exact component={ReviewEdit} />
              <Route path="/tours/rate/:id" exact component={RateTour} />

              <Route path="/bookings" exact component={BookingShow} />
              <Route path="/allBookings" exact component={BookingList} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/help/user/:userId" exact component={QuestionList} />
              <Route
                path="/help/user/:userId/question/:questionId"
                component={QuestionShow}
              />
              <Route path="/questions" exact component={AllQuestions} />
              <Route path="/help/question" exact component={QuestionCreate} />
              <Route path="/answers/edit/:id" component={AnswerEdit} />

              <Route path="*" component={notFound} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(App);
