require('./styles.css');

import React, {Component, PropTypes, Children, cloneElement} from 'react';

import TransitionGroup from 'react-addons-css-transition-group';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import container from './container';

import Modal from 'Modal';

class Base extends Component {

  render() {
    const { children, ModalContent, ...props } = this.props;
    return (
      <MuiThemeProvider>
        <div className="Base">
          {Children.map(children, (child) => {
            return cloneElement(child, props);
          })}
          <TransitionGroup
            transitionEnterTimeout={0}
            transitionLeaveTimeout={0}
            transitionName={{
              enter: 'animated', enterActive: 'zoomIn',
              leave: 'animated', leaveActive: 'zoomOut',
            }}
          >
            {ModalContent !== null && (
              <Modal closeModal={this.props.closeModal}>
                <ModalContent onComplete={this.props.closeModal} />
              </Modal>
            )}
          </TransitionGroup>
        </div>
      </MuiThemeProvider>
    );
  }

  static contextTypes = {
    router: PropTypes.object,
  };
}

export default container(Base);
