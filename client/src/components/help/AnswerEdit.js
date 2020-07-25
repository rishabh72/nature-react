import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { fetchAnswer, editAnswer } from '../../actions';
import AnswerForm from './AnswerForm';
import history from '../../history';
import _ from 'lodash';
class AnswerEdit extends React.Component {
  componentDidMount() {
    this.props.fetchAnswer(this.props.match.params.id);
  }
  onSubmit = (formValues) => {
    this.props.editAnswer(this.props.match.params.id, formValues);
  };
  renderForm() {
    return (
      <AnswerForm
        onSubmit={this.onSubmit}
        initialValues={_.pick(this.props.answers, 'text')}
        showCancelButton={this.showCancelButton}
      />
    );
  }
  showCancelButton() {
    return (
      <div onClick={() => history.goBack()} className="button">
        cancel
      </div>
    );
  }
  render() {
    return <Modal extraa={this.renderForm()} />;
  }
}
const mapStateToProps = (state, ownProps) => {
  return { answers: state.answers[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchAnswer, editAnswer })(
  AnswerEdit
);
