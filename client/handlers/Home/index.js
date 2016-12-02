require('./styles.css');

import React, { Component, PropTypes } from 'react';
import { has } from 'lodash';

import { login } from 'SessionActions';

import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {

  componentWillMount() {
    if (this.props.token.length > 0) {
      this.context.router.push('/app');
    } else {
      const { query } = this.props.location;
      if (has(query, 't')) {
        this.props.dispatch(login(query.t));
      }
    }
  }

  componentDidUpdate() {
    if (this.props.token.length > 0) {
      this.context.router.push('/app');
    }
  }

  render() {
    return (
      <div className="Home">
        <h1>Pipl Facebook TestBed</h1>
        <p>
          A simple application trying to get information about facebook friends through the pipl.com api.
        </p>
        <RaisedButton
          label="Facebook Login"
          href="http://localhost:3333/users/auth/facebook"
          primary
        />
      </div>
    );
  }

  static displayName = 'Home';

  static contextTypes = {
    router: PropTypes.object,
  };

}

export default Home;
