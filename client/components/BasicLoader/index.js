require('./styles.css');

import React, { Component } from 'react';

class BasicLoader extends Component {

  render() {
    return (
      <div className="BasicLoader-wrapper">
        <div className="BasicLoader" />
      </div>
    );
  }

  static displayName = 'BasicLoader';

  static propTypes = {};

}

export default BasicLoader;
