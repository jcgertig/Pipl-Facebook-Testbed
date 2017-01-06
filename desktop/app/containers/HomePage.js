// @flow
import React, { Component, PropTypes } from 'react';
import Home from '../components/Home';

export default class HomePage extends Component {
  static propTypes = {
    platform: PropTypes.string,
    token: PropTypes.string,
    currentUser: PropTypes.object,
  };

  render() {
    return (
      <Home {...this.props} />
    );
  }
}
