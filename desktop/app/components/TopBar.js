import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import styles from '../styles/TopBar.css';

class TopBar extends Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    onAvatarClick: PropTypes.func.isRequired,
  };

  render() {
    const { onAvatarClick, currentUser } = this.props;
    return (
      <div className={styles.TopBar}>
        <div className={styles['TopBar-col-left']}>
          <IndexLink to="/" style={{ fontSize: '20px', fontWeight: 400 }} >
            Pipl Fb TestBed
          </IndexLink>
        </div>
        <div className={styles['TopBar-col-center']} />
        <div className={styles['TopBar-col-right']}>
          {currentUser.name}
          <IconButton
            style={{ marginLeft: '10px', height: 'auto', width: 'auto' }}
            tooltip="Log Out"
            touch
            tooltipPosition="bottom-left"
            onClick={onAvatarClick}
          >
            <Avatar src={currentUser.profileImage} className={styles['TopBar-profile']} />
          </IconButton>
        </div>
      </div>
    );
  }

}

export default TopBar;
