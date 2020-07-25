import React from 'react';
import { connect } from 'react-redux';
import { fetchTour, editTour, updateTourImages } from '../../actions';
import TourForm from './TourForm';
import TourImageForm from './TourImageForm';
import { Redirect } from 'react-router-dom';

class TourEdit extends React.Component {
  componentDidMount() {
    this.props.fetchTour(this.props.match.params.id);
  }
  onSubmit = (values) => {
    const {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      description,
      locations,
      startLocation,
      startDates,
      guideIds,
    } = values;
    const formValues = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      description,
      locations,
      startLocation,
      startDates,
      guides: guideIds,
    };
    this.props.editTour(this.props.match.params.id, formValues);
  };
  onImageSubmit = (fd) => {
    this.props.updateTourImages(this.props.match.params.id, fd);
  };
  render() {
    if (this.props.auth.role !== 'admin') return <Redirect to="/" />;

    return (
      <div>
        <TourForm onSubmit={this.onSubmit} tour={this.props.tour} />
        <hr />
        <TourImageForm
          tour={this.props.tour}
          onImageSubmit={this.onImageSubmit}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { tour: state.tours[ownProps.match.params.id], auth: state.auth };
};

export default connect(mapStateToProps, {
  fetchTour,
  editTour,
  updateTourImages,
})(TourEdit);
