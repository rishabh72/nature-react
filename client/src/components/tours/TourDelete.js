import React from 'react';
import Modal from '../Modal';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTour, deleteTour } from '../../actions';
import history from '../../history';

class TourDelete extends React.Component {
  constructor(props) {
    super(props);
    this.deleteRef = React.createRef();
  }
  componentDidMount() {
    this.props.fetchTour(this.props.match.params.id);
  }
  onClickDeleteTour = async () => {
    this.deleteRef.current.disabled = true;
    this.deleteRef.current.innerText = 'Deleting Tour...';
    await this.props.deleteTour(this.props.match.params.id);
    if (this.deleteRef.current) {
      this.deleteRef.current.disabled = false;
      this.deleteRef.current.innerText = 'Delete Tour';
    }
  };
  renderActions() {
    return (
      <div className="buttons">
        <Link to="/" className="button is-primary">
          <b>Cancel</b>
        </Link>
        <button
          ref={this.deleteRef}
          onClick={this.onClickDeleteTour}
          className="button is-warning"
        >
          <b>Delete</b>
        </button>
      </div>
    );
  }
  renderContent() {
    if (!this.props.tour) {
      return 'Are you sure you want to delete this tour';
    }
    return `Are you sure you want to delete tour: ${this.props.tour.name.toUpperCase()}`;
  }
  render() {
    if (this.props.auth.role !== 'admin') return <Redirect to="/" />;
    return (
      <Modal
        title="Delete Tour"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { tour: state.tours[ownProps.match.params.id], auth: state.auth };
};
export default connect(mapStateToProps, { fetchTour, deleteTour })(TourDelete);
