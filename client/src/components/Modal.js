import React from 'react';

const Modal = (props) => {
  return (
    <div className="modal is-active">
      <div onClick={props.onDismiss} className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <div className="title has-text-danger is-4 is-spaced">
            {props.title}
          </div>
          <div className="subtitle">{props.content}</div>
          {props.extraa}
          {props.actions}
        </div>
      </div>
    </div>
  );
};

export default Modal;
