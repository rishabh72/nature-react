import React from 'react';
import { connect } from 'react-redux';
import { fetchTours } from '../../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Filter from './tourFilter';

class TourList extends React.Component {
  componentDidMount() {
    this.props.fetchTours();
  }
  renderDifficultyTags(tour) {
    if (tour.difficulty === 'easy') {
      return 'tag is-primary is-light is-medium';
    }
    if (tour.difficulty === 'medium') {
      return 'tag is-info is-light is-medium';
    }
    if (tour.difficulty === 'difficult') {
      return 'tag is-warning is-light is-medium';
    }
  }

  renderList() {
    //console.log(this.props.role);
    return this.props.tours.map((tour) => {
      return (
        <div
          className="column is-two-fifths-desktop is-one-third-widescreen is-three-fifths-tablet"
          key={tour.id}
        >
          <div className="card">
            <div className="card-image">
              <figure className="image is-3by2">
                <img
                  src={`${process.env.REACT_APP_IMG_SOURCE}/tours/${tour.imageCover}`}
                  alt={`${tour.name}`}
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="title has-text-link is-size-4-mobile">
                {tour.name}
              </div>
              <p className="subtitle is-size-6-mobile">
                <span className={this.renderDifficultyTags(tour)}>
                  {tour.difficulty}
                </span>
                &emsp;
                {`${tour.duration}-day tour`}
              </p>
              <p className=" subtitle is-6 is-size-6-mobile">{tour.summary}</p>
              <div className="level is-mobile">
                <div className="level-left">
                  <div>
                    <p className="subtitle is-6">
                      <span className="icon is-small has-text-link">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                      <span>&nbsp;</span>
                      <span>{tour.startLocation.description}</span>
                    </p>
                    <p className="subtitle is-6">
                      <span className="icon is-small has-text-link">
                        <i className="fas fa-flag"></i>
                      </span>
                      <span>&nbsp;</span>
                      <span>{tour.locations.length} stops</span>
                    </p>
                  </div>
                </div>
                <div className="level-right">
                  <div>
                    <p className="subtitle is-6">
                      <span className="icon is-small has-text-link">
                        <i className="far fa-calendar-alt"></i>
                      </span>

                      <span>
                        &nbsp;
                        {new Date(tour.startDates[0]).toLocaleString('en-us', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </p>
                    <p className="subtitle is-6">
                      <span className="icon is-small has-text-link">
                        <i className="fa fa-user-alt"></i>
                      </span>
                      <span>&nbsp;</span>
                      <span>{tour.maxGroupSize} people</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="level is-mobile">
                <div className="level-left">
                  <div>
                    <p className="subtitle is-size-6-mobile">
                      ${tour.price} per person
                    </p>
                    <p className="subtitle is-size-6-mobile">
                      {tour.ratingsAverage} rating({tour.ratingsQuantity})
                    </p>
                  </div>
                </div>
                <div className="level-right">
                  <Link to={`/tours/${tour.id}`} className="button is-link">
                    <strong>Details</strong>
                  </Link>
                </div>
              </div>
            </div>
            {this.renderAuth(tour)}
          </div>
        </div>
      );
    });
  }

  renderAuth(tour) {
    if (this.props.profile.role === 'admin') {
      return (
        <div>
          <footer className="card-footer">
            <Link to={`/tours/edit/${tour.id}`} className="card-footer-item">
              Edit
            </Link>
            <Link to={`/tours/delete/${tour.id}`} className="card-footer-item">
              Delete
            </Link>
          </footer>
        </div>
      );
    }
  }

  render() {
    //console.log(this.props.tours);
    if (_.isEmpty(this.props.tours)) {
      return (
        <div className="container is-tablet">
          <Filter />
          <br />
          <div className="section">
            <div className="has-text-success has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-3x fa-bus-alt"></i>
              </span>
            </div>
            <br />
            <div className="title has-text-success subtitle has-text-centered">
              Please wait...
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container is-tablet">
        <br />
        <Filter />
        <br />
        <div className="columns is-multiline is-centered">
          {this.renderList()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { tours: Object.values(state.tours), profile: state.auth };
};

export default connect(mapStateToProps, { fetchTours })(TourList);
