import React from 'react';

class TourImageForm extends React.Component {
  state = { imageCover: '', images: [], isDisabled: false };

  componentDidUpdate(prevProps) {
    if (this.props.tour !== prevProps.tour) {
      const { tour } = this.props;
      this.setState({ imageCover: tour.imageCover, images: tour.images });
    }
  }
  onImageSubmit = async () => {
    await this.setState({ isDisabled: true });
    const { imageCover, images } = this.state;
    const fd = new FormData();
    fd.append('imageCover', imageCover);
    images.forEach((image) => {
      fd.append('images', image);
    });
    await this.props.onImageSubmit(fd);
    this.setState({ isDisabled: true });
  };
  onChangeImagesUpload = (e) => {
    const files = this.state.images.filter((image) => image.name !== undefined);
    this.setState({
      images: [...files, ...e.target.files],
    });
  };
  renderUploadImages() {
    return (
      <div className="field">
        <div className="file is-link mb-3">
          <label className="file-label">
            <input
              multiple
              onChange={(e) => this.onChangeImagesUpload(e)}
              className="file-input"
              type="file"
              name="images"
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-camera"></i>
              </span>
              <span className="file-label">Upload Tour Images</span>
            </span>
          </label>
        </div>
        {this.showFilesName()}
      </div>
    );
  }
  showFilesName() {
    if (this.state.images.length === 0) {
      return null;
    }
    return this.state.images.map((image, index) => {
      if (image.name) {
        return (
          <div key={index} className="tags are-medium has-addons">
            <span className="tag">{image.name}</span>
            <div
              onClick={() =>
                this.setState({
                  images: this.state.images.filter(
                    (el) => el.name !== image.name
                  ),
                })
              }
              className="tag is-delete"
            ></div>
          </div>
        );
      }
      return (
        <div key={index} className="tags are-medium has-addons">
          <span className="tag">{image}</span>
          <div
            onClick={() =>
              this.setState({
                images: this.state.images.filter((el) => el !== image),
              })
            }
            className="tag is-delete"
          ></div>
        </div>
      );
    });
  }
  renderUploadImage() {
    return (
      <div className="field">
        <div className="file is-fullwidth has-name is-link">
          <label className="file-label">
            <input
              onChange={(e) => this.setState({ imageCover: e.target.files[0] })}
              className="file-input"
              type="file"
              name="image"
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-camera"></i>
              </span>
              <span className="file-label">Upload Tour Image Cover</span>
            </span>
            <span className="file-name">
              {this.state.imageCover.name
                ? this.state.imageCover.name
                : this.state.imageCover}
            </span>
          </label>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="container">
        <div className="title is-3 has-text-info has-text-centered">Images</div>
        {this.renderUploadImage()}
        {this.renderUploadImages()}
        <div className="field">
          <div className="control">
            <div className="buttons is-centered ">
              <button
                disabled={this.state.isDisabled}
                onClick={this.onImageSubmit}
                className="button is-danger"
              >
                <span className="icon ">
                  <i className="fas fa-image"></i>
                </span>
                <span>Submit Images</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TourImageForm;
