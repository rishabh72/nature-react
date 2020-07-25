import React from 'react';

class UploadImage extends React.Component {
  state = { selectedFile: null };

  renderFileName() {
    if (this.state.selectedFile) {
      return this.state.selectedFile.name;
    }
    return 'No file selected';
  }

  onClickHandler = () => {
    const fd = new FormData();
    if (this.props.sub === 'tour') {
      fd.append('imageCover', this.state.selectedFile);
    } else {
      fd.append('photo', this.state.selectedFile);
    }

    this.props.onImageSubmit(fd);
  };
  renderCancelButton = () => {
    if (this.props.isCancelButton) {
      return (
        <div onClick={this.props.onDismiss} className="button">
          Cancel
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        <div className="file is-fullwidth has-name is-primary">
          <label className="file-label">
            <input
              onChange={(e) =>
                this.setState({ selectedFile: e.target.files[0] })
              }
              className="file-input"
              type="file"
              name="resume"
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-camera"></i>
              </span>
              <span className="file-label">Upload image</span>
            </span>
            <span
              style={{ color: this.props.fileTextColor || 'black' }}
              className="file-name"
            >
              {this.renderFileName()}
            </span>
          </label>
        </div>
        <br />
        <div className="buttons">
          <div onClick={this.onClickHandler} className="button is-link">
            save Image
          </div>
          {this.renderCancelButton()}
        </div>
      </div>
    );
  }
}

export default UploadImage;
