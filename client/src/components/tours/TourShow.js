import React from 'react';
import { connect } from 'react-redux';
import { fetchTour, fetchTourReviews } from '../../actions';
import { Link } from 'react-router-dom';
import TourReview from './TourReview';
import { bookTour } from '../stripe';

class TourShow extends React.Component {
  constructor(props) {
    super(props);
    this.bookbtn = React.createRef();
  }
  componentDidMount() {
    this.props.fetchTour(this.props.match.params.id);
  }
  overviewBox(label, text, icon) {
    return (
      <div className="subtitle">
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <span className="icon has-text-link">
                <i className={`fa fa-${icon}`} />
              </span>
            </div>
            <div className="level-item">
              <p>{label}</p>
            </div>
            <div className="level-item">
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderContent() {
    if (!this.props.tour) {
      return (
        <div className="section">
          <div className="has-text-info has-text-centered">
            <span className="icon is-large">
              <i className="fas fa-3x fa-bus-alt"></i>
            </span>
          </div>
          <br />
          <div className="title has-text-info subtitle has-text-centered">
            Loading Tour...
          </div>
        </div>
      );
    }
    return (
      <div>
        <section
          style={{
            backgroundImage:
              'linear-gradient(to right bottom, #24c6dc, #514a9d)',
          }}
          className="hero is-medium"
        >
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-2 is-spaced has-text-white">
                <b>{this.props.tour.name}</b>
              </h1>
              <br />
              <div className="subtitle is-4 has-text-white">
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <span className="icon has-text-white">
                        <i className="far fa-clock" />
                      </span>
                    </div>
                    <div className="level-item">
                      <p>{`${this.props.tour.duration} days`} </p>
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      <span className="icon has-text-white">
                        <i className="fas fa-map-marker-alt" />
                      </span>
                    </div>
                    <div className="level-item">
                      <p>{this.props.tour.startLocation.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <br />
        {this.renderTour()}
      </div>
    );
  }
  renderGuideNames(guide) {
    if (guide.role === 'lead-guide') {
      return <div className="subtitle is-size-6-mobile">Lead Guide</div>;
    }
    if (guide.role === 'guide') {
      return <div className="subtitle is-size-6-mobile">Tour Guide</div>;
    }
  }
  renderGuide() {
    return this.props.tour.guides.map((guide) => {
      return (
        <div className="subtitle" key={guide._id}>
          <div className="level is-mobile">
            <div className="level-left">
              <div className="level-item">
                <figure className="image is-64x64">
                  <img
                    className="is-rounded"
                    src={`${process.env.REACT_APP_IMG_SOURCE}/users/${guide.photo}`}
                    alt={`${guide.name}`}
                  />
                </figure>
              </div>
              <div className="level-item">{this.renderGuideNames(guide)}</div>
              <div className="level-item">
                <p className="subtitle p-1 is-size-6-mobile">{guide.name}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  renderParagraph() {
    return this.props.tour.description.split('\n').map((p, index) => {
      return (
        <div key={index} className="subtitle is-size-6-mobile">
          {p}
        </div>
      );
    });
  }

  renderImages() {
    return this.props.tour.images.map((image, index) => {
      return (
        <div className="column" key={index}>
          <figure className="image is-5by3">
            <img
              src={`${process.env.REACT_APP_IMG_SOURCE}/tours/${image}`}
              alt={`The ${this.props.tour.name}-${index}`}
            />
          </figure>
        </div>
      );
    });
  }

  renderTour() {
    const date = new Date(this.props.tour.startDates[0]).toLocaleString(
      'en-us',
      {
        month: 'long',
        year: 'numeric',
      }
    );

    return (
      <div>
        <div className="columns is-centered is-multiline">
          <div className="column is-two-fifths-desktop is-full-tablet">
            <div className="columns is-multiline is-centered">
              <div className="column is-full">
                <div className="columns is-mobile">
                  <div className="column"></div>
                  <div className="column is-four-fifths-mobile is-full-tablet">
                    <div className="title is-4 is-spaced has-text-link is-uppercase">
                      Quick facts
                    </div>
                    {this.overviewBox('Next Date', date, 'calendar-alt')}
                    {this.overviewBox(
                      'Difficulty',
                      this.props.tour.difficulty,
                      'signal'
                    )}
                    {this.overviewBox(
                      'Group Size',
                      `${this.props.tour.maxGroupSize} people`,
                      'users'
                    )}
                    {this.overviewBox(
                      'Rating',
                      `${this.props.tour.ratingsAverage} / 5`,
                      'star'
                    )}
                    <br />
                  </div>
                  <div className="column"></div>
                </div>
              </div>
              <div className="column">
                <div className="columns is-mobile">
                  <div className="column"></div>
                  <div className="column is-four-fifths-mobile is-full-tablet">
                    <div className="title is-4 is-spaced has-text-link is-uppercase">
                      your tour guides
                    </div>
                    {this.renderGuide()}
                    <br />
                  </div>
                  <div className="column"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-two-fifths-desktop is-full-tablet is-narrow">
            <div className="title is-4 is-spaced has-text-link is-uppercase">
              {`About ${this.props.tour.name} Tour`}
            </div>

            {this.renderParagraph()}
          </div>
        </div>
        <div className="columns is-gapless">{this.renderImages()}</div>
        <br />

        <hr />
        <br />
        <div className="columns is-centered">
          <div className="column is-three-quarters-tablet">
            <div className="box">
              <div className="columns is-multiline is-centered is-vcentered is-desktop">
                <div className="column is-two-thirds-desktop">
                  <div className="title is-4 is-size-5-mobile is-spaced">
                    What are you waiting for?
                  </div>
                  <div className="subtitle is-size-6-mobile has-text-weight-light">
                    {`${this.props.tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
                  </div>
                </div>
                <div className="column has-text-centered is-narrow-desktop">
                  {this.renderButtons()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <TourReview
          tourId={this.props.match.params.id}
          tourName={this.props.tour.name}
        />

        <br />
      </div>
    );
  }
  onBookButtonClick = () => {
    bookTour(this.props.tour.id);
    this.bookbtn.current.innerHTML = '<b>Please wait...</b>';
  };

  renderButtons() {
    if (this.props.auth.name) {
      return (
        <div
          ref={this.bookbtn}
          onClick={() => this.onBookButtonClick()}
          className="button is-link is-rounded is-medium"
        >
          <b>Book Tour Now</b>
        </div>
      );
    }
    return (
      <Link to="/login" className="button is-link is-rounded is-medium">
        <b>Login to Book Tour</b>
      </Link>
    );
  }

  render() {
    return this.renderContent();
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tour: state.tours[ownProps.match.params.id],
    auth: state.auth,
    reviews: Object.values(state.reviews),
  };
};

export default connect(mapStateToProps, { fetchTour, fetchTourReviews })(
  TourShow
);
