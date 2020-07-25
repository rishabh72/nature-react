import React from 'react';
import _ from 'lodash';

class TourForm extends React.Component {
  state = {
    showAddLocationForm: false,
    showStartLocationForm: false,
    name: '',
    duration: '',
    maxGroupSize: '',
    difficulty: 'easy',
    price: '',
    summary: '',
    description: '',

    startDates: [],
    startLocation: {},
    locations: [],
    guides: [],
    loc: {},
    date: new Date(Date.now()).toISOString().substr(0, 10),
    guideIds: [],
    errors: [],
    isSubmitted: false,
    isDisabled: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props.tour !== prevProps.tour) {
      const { tour } = this.props;
      this.setState({
        name: tour.name,
        duration: tour.duration,
        maxGroupSize: tour.maxGroupSize,
        difficulty: tour.difficulty,
        price: tour.price,
        summary: tour.summary,
        description: tour.description,
        imageCover: tour.imageCover,
        images: tour.images,
        startDates: tour.startDates,
        startLocation: tour.startLocation,
        locations: tour.locations,
        guides: tour.guides,
        guideIds: tour.guides.map((guide) => guide._id),
      });
    }
  }
  async checkSubmit() {
    const {
      name,
      duration,
      maxGroupSize,
      price,
      summary,
      description,
      startDates,
      startLocation,
      locations,
      guideIds,
    } = this.state;
    await this.setState({ errors: [] });

    if (name.length < 10) {
      await this.setState({
        errors: [
          ...this.state.errors,

          'A tour name must be greater than 10 characters',
        ],
      });
    }
    if (name.length > 40) {
      await this.setState({
        errors: [
          ...this.state.errors,

          'A tour name must be less than 40 characters',
        ],
      });
    }
    if (name === '') {
      await this.setState({
        errors: [...this.state.errors, 'A tour name must have name'],
      });
    }
    if (duration === '') {
      await this.setState({
        errors: [...this.state.errors, 'A tour must have duration'],
      });
    }
    if (maxGroupSize === '') {
      await this.setState({
        errors: [...this.state.errors, 'A tour must have a maximum group size'],
      });
    }
    if (price === '') {
      await this.setState({
        errors: [...this.state.errors, 'A tour must have price'],
      });
    }
    if (summary === '') {
      await this.setState({
        errors: [...this.state.errors, 'A tour must have summary'],
      });
    }
    if (description === '') {
      await this.setState({
        errors: [...this.state.errors, 'A tour must have description'],
      });
    }
    if (startDates.length === 0) {
      await this.setState({
        errors: [...this.state.errors, 'A tour must have start dates'],
      });
    }
    if (_.isEmpty(startLocation)) {
      await this.setState({
        errors: [...this.state.errors, 'A tour must have startLocation'],
      });
    }
    if (locations.length === 0) {
      await this.setState({
        errors: [...this.state.errors, 'A tour must have locations'],
      });
    }
    if (guideIds.length === 0) {
      await this.setState({
        errors: [...this.state.errors, 'A tour must have guides'],
      });
    }
  }

  onSubmit = async () => {
    await this.setState({ isDisabled: true });
    await this.checkSubmit();
    if (_.isEmpty(this.state.errors)) {
      this.props.onSubmit(this.state);
    }

    this.setState({ isDisabled: false });
  };

  renderAddDate() {
    return (
      <div className="field">
        <input
          value={this.state.date}
          onChange={(e) => {
            this.setState({
              date: e.target.value,
            });
          }}
          type="date"
          className="input"
        />
        <button
          onClick={() =>
            this.setState({
              startDates: [
                ...this.state.startDates,
                new Date(this.state.date).toISOString(),
              ],
            })
          }
          className="button"
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
        </button>
      </div>
    );
  }
  renderDates() {
    return this.state.startDates.map((date, index) => {
      return (
        <div key={index} className="tags are-medium has-addons">
          <div className="tag ">{new Date(date).toDateString()}</div>
          <div
            onClick={() =>
              this.setState({
                startDates: this.state.startDates.filter((d) => d !== date),
              })
            }
            className="tag is-delete"
          ></div>
        </div>
      );
    });
  }

  renderLocations() {
    if (this.state.locations.length === 0) {
      return null;
    }
    return this.state.locations.map((location, index) => {
      return (
        <div key={index} className="notification">
          <button
            onClick={() =>
              this.setState({
                locations: this.state.locations.filter(
                  (el) =>
                    el.coordinates.join(',') !== location.coordinates.join(',')
                ),
              })
            }
            className="delete"
          ></button>

          <p>Coordinates:&nbsp;{location.coordinates.join(', ')}</p>
          <p>Description: &nbsp;{location.description}</p>
          {location.day ? <p>Day:&nbsp;{location.day}</p> : null}
        </div>
      );
    });
  }
  renderStartLocation = () => {
    if (_.isEmpty(this.state.startLocation)) {
      return null;
    }
    return (
      <div className="notification">
        <button
          onClick={() => this.setState({ startLocation: {} })}
          className="delete"
        ></button>
        <p>
          Coordinates:&nbsp;{this.state.startLocation.coordinates.join(', ')}
        </p>
        <p>Description: &nbsp;{this.state.startLocation.description}</p>
        <p>Address: &nbsp;{this.state.startLocation.address}</p>
      </div>
    );
  };

  onSubmitAddLocations = () => {
    this.setState({
      locations: [...this.state.locations, this.state.loc],
      showAddLocationForm: false,
    });
  };
  onSubmitStartLocation = () => {
    this.setState({
      startLocation: this.state.loc,
      showStartLocationForm: false,
    });
  };
  renderDayorAddress = (text) => {
    if (text === 'address') {
      return (
        <div className="field">
          <label className="label">Address</label>
          <input
            className="input"
            value={this.state.loc.address ? this.state.loc.address : ''}
            onChange={(e) =>
              this.setState({
                loc: {
                  ...this.state.loc,
                  address: e.target.value,
                },
              })
            }
          />
        </div>
      );
    }

    return (
      <div className="field">
        <label className="label">Day</label>

        <div className="control">
          <input
            onChange={(e) =>
              this.setState({
                loc: { ...this.state.loc, day: e.target.value },
              })
            }
            value={this.state.loc.day ? this.state.loc.day : ''}
            className="input"
            placeholder="integer numbers 1,2,3.."
          />
        </div>
      </div>
    );
  };

  onClickStartLocationBtn = () => {
    this.setState({ showStartLocationForm: !this.state.showStartLocationForm });
  };
  onClickAddLocationBtn = () => {
    this.setState({ showAddLocationForm: !this.state.showAddLocationForm });
  };

  addLocationBtn(func, text) {
    return (
      <div className="field">
        <div className="control">
          <button onClick={() => func()} className="button">
            <span className="icon is-small">
              <i className={`fas fa-${text}`}></i>
            </span>
          </button>
        </div>
      </div>
    );
  }
  addLocationsForm(func, text) {
    return (
      <div>
        <div className="field">
          <label className="label"> Longitude and Latitude</label>

          <div className="control">
            <input
              onChange={(e) =>
                this.setState({
                  loc: {
                    ...this.state.loc,
                    coordinates: e.target.value.split(','),
                  },
                })
              }
              className="input"
              placeholder="longtitude,latitude"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>

          <div className="control">
            <input
              onChange={(e) =>
                this.setState({
                  loc: { ...this.state.loc, description: e.target.value },
                })
              }
              className="input"
            />
          </div>
          <div className="help">Location Description should be small </div>
        </div>
        {this.renderDayorAddress(text)}

        <div className="field is-grouped">
          <div className="control">
            <button onClick={() => func()} className="button ">
              Submit Location
            </button>
          </div>
          <div className="control">
            <button
              onClick={() =>
                this.setState({
                  showAddLocationForm: false,
                  showStartLocationForm: false,
                })
              }
              className="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  renderErrors() {
    if (this.state.errors.length === 0) return null;
    return this.state.errors.map((error) => {
      return (
        <div>
          <span class="tag is-warning is-light">{error}</span>
        </div>
      );
    });
  }

  renderForm() {
    return (
      <div>
        <div className="field">
          <div className="label">Name</div>
          <div className="control">
            <input
              className="input"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <div className="label">Duration</div>
          <div className="control">
            <input
              className="input"
              value={this.state.duration}
              onChange={(e) => this.setState({ duration: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <div className="label">Maximum Group Size</div>
          <div className="control">
            <input
              className="input"
              value={this.state.maxGroupSize}
              onChange={(e) => this.setState({ maxGroupSize: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Difficulty</label>
          <div className="control">
            <div className="select">
              <select
                onChange={(e) => this.setState({ difficulty: e.target.value })}
                value={this.state.difficulty}
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="difficult">difficult</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="label">Price</div>
          <div className="control">
            <input
              className="input"
              value={this.state.price}
              onChange={(e) => this.setState({ price: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <div className="label">Summary</div>
          <div className="control">
            <input
              className="input"
              value={this.state.summary}
              onChange={(e) => this.setState({ summary: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            ></textarea>
          </div>
        </div>

        <div className="field">
          <div className="label">Guides</div>
          <div className="control">
            <input
              value={this.state.guideIds.join(', ')}
              onChange={(e) =>
                this.setState({
                  guideIds: e.target.value
                    .split(' ')
                    .join('')
                    .split(','),
                })
              }
              className="input"
            />
          </div>
          <div className="help">
            Please provide user id with comma separated
          </div>
        </div>

        <hr />
        <div className="field">
          <label className="label">Locations</label>
          {this.renderLocations()}
        </div>
        {this.addLocationBtn(this.onClickAddLocationBtn, 'globe')}

        {this.state.showAddLocationForm
          ? this.addLocationsForm(this.onSubmitAddLocations, 'day')
          : null}

        <hr />
        <div className="field">
          <label className="label">Start Location</label>
          {this.renderStartLocation()}
        </div>

        {this.addLocationBtn(this.onClickStartLocationBtn, 'thumbtack')}
        {this.state.showStartLocationForm
          ? this.addLocationsForm(this.onSubmitStartLocation, 'address')
          : null}

        <hr />
        <div className="field">
          <label className="label">StartDates</label>

          {this.state.startDates.length === 0 ? null : this.renderDates()}
          {this.renderAddDate()}
        </div>

        <div className="field">
          <div className="control">
            <div className="buttons is-centered">
              <div
                disabled={this.state.isDisabled}
                onClick={() => this.onSubmit()}
                className="button is-danger"
              >
                &emsp; &emsp;
                <span className="icon ">
                  <i className="fas  fa-check"></i>
                </span>
                <span>Submit</span>
                &emsp; &emsp;
              </div>
            </div>
          </div>
        </div>
        <br />
        {this.renderErrors()}
      </div>
    );
  }
  render() {
    // if (this.props.auth.role !== 'admin') return <Redirect to="/" />;
    return <div className="container">{this.renderForm()}</div>;
  }
}

export default TourForm;
