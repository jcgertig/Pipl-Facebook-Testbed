/* global Promise */

import React, { Component, PropTypes } from 'react';
import { isUndefined, has } from 'lodash';

import { StickyContainer, Sticky } from 'react-sticky';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/action/list';
import Drawer from 'material-ui/Drawer';

import { logout } from '../actions/SessionActions';
import { getFriends, getMoreFriends, getPiplForFriend } from '../actions/FriendActions';

import TopBar from './TopBar';
import BasicLoader from './BasicLoader';
import FriendsList from './FriendsList';
import InfoBlock from './InfoBlock';

import styles from '../styles/Home.css';

class App extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    token: PropTypes.string
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    selectedUsers: [],
    drawerOpen: false,
    width: null,
    height: null
  };

  componentWillMount() {
    this.getFriends.bind(this)();
    this.updateDimensions.bind(this)();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentDidUpdate() {
    if (this.props.token.length === 0) {
      this.context.router.push('/');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  getFriends() {
    return new Promise((done, fail) => {
      if (!isUndefined(window.FB)) {
        done();
      } else {
        fail();
      }
    })
      .then(() => this.props.dispatch(getFriends()))
      .catch(() => setTimeout(this.getFriends.bind(this), 1000));
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  logout() {
    this.props.dispatch(logout());
  }

  handleSelection(selectedUsers) {
    console.log('selectedUsers', selectedUsers);
    const noPipl = selectedUsers.filter((item) => !has(item.friend, 'pipl'));
    if (noPipl.length > 0) {
      for (const person of noPipl) {
        const { friend: { firstName, lastName }, index } = person;
        this.props.dispatch(getPiplForFriend(firstName, lastName, index));
      }
    }
    this.setState({ selectedUsers });
  }

  render() {
    window.logout = this.logout.bind(this);
    const { currentUser, friends, hasMoreFriends, addressLatLang } = this.props;
    const { width, selectedUsers } = this.state;
    if (currentUser === null || friends.length === 0) { return <BasicLoader />; }

    return (
      <div>
        <StickyContainer className={styles.App}>
          <Sticky style={{ zIndex: 9999 }} stickyClassName={styles['is-sticky']} topOffset={100}>
            <TopBar currentUser={currentUser} onAvatarClick={this.logout.bind(this)} />
          </Sticky>
          <div className={styles['App-content']}>
            <div className={styles['App-col-wrapper']}>
              {width >= 700 ? (
                <div className={styles['App-col-2']}>
                  <FriendsList
                    friends={friends}
                    onSelection={this.handleSelection.bind(this)}
                    hasMore={hasMoreFriends}
                    getMore={() => this.props.dispatch(getMoreFriends())}
                  />
                </div>
              ) : null}
              <div className={styles['App-col-8']}>
                <Subheader>
                  Info
                  {width < 700 ? (
                    <IconButton
                      style={{ float: 'right', marginRight: '5px' }}
                      onClick={() => this.setState({ drawerOpen: true })}
                    >
                      <MenuIcon />
                    </IconButton>
                  ) : null}
                </Subheader>
                <Divider />
                <div className={styles['App-info-content']}>
                  <InfoBlock
                    users={selectedUsers}
                    currentUser={currentUser}
                    addressLatLang={addressLatLang}
                  />
                </div>
              </div>
            </div>
          </div>
        </StickyContainer>
        {width < 700 ? (
          <Drawer
            open={this.state.drawerOpen}
            openSecondary
            docked={false}
            onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
          >
            <FriendsList
              friends={friends}
              onSelection={this.handleSelection.bind(this)}
              hasMore={hasMoreFriends}
              getMore={() => this.props.dispatch(getMoreFriends())}
            />
          </Drawer>
        ) : null}
      </div>
    );
  }

}

export default connect(state => ({
  friends: state.friends.list,
  hasMoreFriends: state.friends.nextLink !== '',
  addressLatLang: state.friends.addressLatLang,
}))(App);
