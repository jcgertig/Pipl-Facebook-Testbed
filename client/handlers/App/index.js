/* global Promise */
require('./styles.css');

import React, { Component, PropTypes } from 'react';
import { isUndefined, has } from 'lodash';

import { StickyContainer, Sticky } from 'react-sticky';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/action/list';
import Drawer from 'material-ui/Drawer';

import container from './container';
import { logout } from 'SessionActions';
import { getFriends, getMoreFriends, getPiplForFriend } from 'FriendActions';

import TopBar from 'TopBar';
import BasicLoader from 'BasicLoader';
import FriendsList from 'FriendsList';
import InfoBlock from 'InfoBlock';

class App extends Component {

  state = { selectedUser: null, drawerOpen: false, width: null, height: null };

  componentWillMount() {
    if (this.props.token.length === 0) {
      this.context.router.push('/');
    } else {
      this.getFriends();
    }
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentDidUpdate() {
    if (this.props.token.length === 0) {
      this.context.router.push('/');
    }
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  getFriends = () => {
    return new Promise((done, fail) => {
      if (!isUndefined(window.FB)) {
        done();
      } else {
        fail();
      }
    })
      .then(() => this.props.dispatch(getFriends()))
      .catch(() => setTimeout(this.getFriends, 1000));
  }

  logout = () => {
    this.props.dispatch(logout());
  };

  handleSelection = (selectedUser, index) => {
    if (!has(selectedUser, 'pipl')) {
      const { firstName, lastName, id } = selectedUser;
      this.props.dispatch(getPiplForFriend(firstName, lastName, id, index));
    }
    this.setState({ selectedUser });
  };

  render() {
    const { currentUser, friends, hasMoreFriends } = this.props;
    const { width } = this.state;
    if (currentUser === null || friends.length === 0) { return <BasicLoader />; }

    return (
      <div>
        <StickyContainer className="App">
          <Sticky style={{zIndex: 9999}} stickyClassName="is-sticky" topOffset={100}>
            <TopBar currentUser={currentUser} onAvatarClick={this.logout} />
          </Sticky>
          <div className="App-content">
            <div className="App-col-wrapper">
              {width >= 700 ? (
                <div className="App-col-2">
                  <FriendsList
                    friends={friends}
                    onSelection={this.handleSelection}
                    hasMore={hasMoreFriends}
                    getMore={()=>this.props.dispatch(getMoreFriends())}
                  />
                </div>
              ) : null}
              <div className="App-col-8">
                <Subheader>
                  Info
                  {width < 700 ? (
                    <IconButton
                      style={{float: 'right', marginRight: '5px'}}
                      onClick={() => this.setState({ drawerOpen: true})}
                    >
                      <MenuIcon />
                    </IconButton>
                  ) : null}
                </Subheader>
                <Divider />
                <div className="App-info-content">
                  {this.state.selectedUser !== null ? (
                    <InfoBlock
                      key={this.state.selectedUser.id}
                      user={this.state.selectedUser}
                      currentUser={currentUser}
                    />
                  ) : null}
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
              onSelection={this.handleSelection}
              hasMore={hasMoreFriends}
              getMore={()=>this.props.dispatch(getMoreFriends())}
            />
          </Drawer>
        ) : null}
      </div>
    );
  }

  static displayName = 'App';

  static contextTypes = {
    router: PropTypes.object,
  };

}

export default container(App);
