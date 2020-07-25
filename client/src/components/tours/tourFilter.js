import React from 'react';
import { connect } from 'react-redux';
import { filterTour } from '../../actions';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      selectedText: '',
      selectedTextName: 'Most Relevant',
    };
    this.select = React.createRef();

    this.filterBtn = React.createRef();
  }

  onSubmit = (e) => {
    e.preventDefault();
  };
  onSelect = async (e) => {
    this.setState({ selectedTextName: e.target.value });
    if (e.target.value === 'Lowest Price') {
      this.filterBtn.current.disabled = true;
      this.select.current.classList.add('is-loading');
      await this.props.filterTour('sort=price');
      this.select.current.classList.remove('is-loading');
      this.filterBtn.current.disabled = false;
      return;
    }
    if (e.target.value === 'Highest Price') {
      this.filterBtn.current.disabled = true;
      this.select.current.classList.add('is-loading');

      await this.props.filterTour('sort=-price');
      this.select.current.classList.remove('is-loading');
      this.filterBtn.current.disabled = false;

      return;
    }
    if (e.target.value === 'Highest Rated') {
      this.filterBtn.current.disabled = true;
      this.select.current.classList.add('is-loading');

      await this.props.filterTour('sort=-ratingsAverage');
      this.select.current.classList.remove('is-loading');
      this.filterBtn.current.disabled = false;

      return;
    }
    if (e.target.value === 'Most Relevant') {
      this.filterBtn.current.disabled = true;
      this.select.current.classList.add('is-loading');

      await this.props.filterTour('sort=price&sort=-ratingsAverage');
      this.select.current.classList.remove('is-loading');
      this.filterBtn.current.disabled = false;

      return;
    }
  };

  renderSelect() {
    if (this.state.display) {
      return (
        <div ref={this.select} className="select">
          <select
            onChange={(e) => this.onSelect(e)}
            value={this.state.selectedTextName}
          >
            <option>Most Relevant</option>

            <option>Lowest Price</option>
            <option>Highest Price</option>

            <option>Highest Rated</option>
          </select>
        </div>
      );
    }
    return null;
  }
  onFilter = () => {
    this.setState({
      display: !this.state.display,
    });
  };
  onReset = () => {
    this.setState({ selectedTextName: 'Most Relevant' });
    this.props.filterTour('sort=price&sort=-ratingsAverage');
  };
  renderReset() {
    if (this.state.selectedTextName !== 'Most Relevant' && this.state.display) {
      return (
        <button onClick={this.onReset} className="button is-text">
          Reset
        </button>
      );
    }
    return null;
  }
  render() {
    return (
      <div>
        <button ref={this.filterBtn} onClick={this.onFilter} className="button">
          <span className=" icon is-small">
            <i className="fas fa-filter"></i>
          </span>
          <span>Filter</span>
        </button>
        &emsp;
        {this.renderSelect()}
        &emsp;
        {this.renderReset()}
      </div>
    );
  }
}

export default connect(null, { filterTour })(Filter);
