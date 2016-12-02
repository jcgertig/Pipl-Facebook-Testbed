require('./styles.css');

import React, { Component, PropTypes } from 'react';

class Modal extends Component {

  render() {
    return (
      <div className="Modal">
        <div className="Modal-content">
          <img
            className="Modal-close"
            src="/public/imgs/close.svg"
            onClick={this.props.closeModal}
          />
          {this.props.children}
        </div>
      </div>
    );
  }

  static displayName = 'Modal';

  static propTypes = {
    children: PropTypes.any.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

}

export default Modal;
