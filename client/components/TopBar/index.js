require('./styles.css');

import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

class TopBar extends Component {

  render() {
    const { onAvatarClick, currentUser } = this.props;
    return(
      <div className="TopBar">
        <div className="TopBar-col-left">
          <IndexLink to="/" style={{ fontSize: '20px', fontWeight: 400 }} >
            Pipl Fb TestBed
          </IndexLink>
        </div>
        <div className="TopBar-col-center" />
        <div className="TopBar-col-right">
          {currentUser.name}
          <IconButton
            style={{ marginLeft: '10px', height: 'auto', width: 'auto' }}
            tooltip="Log Out"
            touch={true}
            tooltipPosition="bottom-left"
            onClick={onAvatarClick}
          >
            <Avatar src={currentUser.profileImage} className="TopBar-profile" />
          </IconButton>
        </div>
      </div>
    );
  }

  static displayName = 'TopBar';

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    onAvatarClick: PropTypes.func.isRequired,
  };

}

export default TopBar;
