// @flow
import React, { Component, PropTypes } from 'react';

import Login from '../components/Login';

class LoginPage extends Component {
  static propTypes = {
    platform: PropTypes.string,
    location: PropTypes.object, // eslint-disable-line
    token: PropTypes.string,
    dispatch: PropTypes.func,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    if (this.props.token.length > 0) {
      this.context.router.push('/app');
    }
  }

  componentDidUpdate() {
    if (this.props.token.length > 0) {
      this.context.router.push('/app');
    }
  }

  render() {
    return (
      <Login platform={this.props.platform} token={this.props.token} />
    );
  }
}

export default LoginPage;
