// @flow
import React, { Component, Children, cloneElement } from 'react';
import { connect } from 'react-redux';

import { TitleBar as WinTitleBar } from 'react-desktop/windows';
import { TitleBar as DarTitleBar } from 'react-desktop/macOs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import os from 'os';

import {
  registerMain, addFileChangeHandler, addGotTokenHandler, register,
  isWindowFullscreen, setFullScreen, closeWindow, minimizeWindow
} from '../utils/windowActions';
import { getJSONFileContent } from '../utils/files';

import { login } from '../actions/SessionActions';

window.API_BASE = 'http://localhost:3333/api';
window.STORAGE_PREFIX = '@pipl-fb';

class App extends Component {

  props: { // eslint-disable-line
    children: HTMLElement
  }

  state = { isFullscreen: false, content: '' };

  componentWillMount() {
    this.updateFullscreen();
    window.addEventListener('resize', this.updateFullscreen.bind(this));
  }

  componentDidMount() {
    const renderer = registerMain();
    addFileChangeHandler(renderer, () => {
      getJSONFileContent()
        .then((content) => console.log('got content', content))
        .catch((err) => console.log('file get err', err));
    });
    addGotTokenHandler(renderer, (e, token) => {
      this.props.dispatch(login(token));
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateFullscreen.bind(this));
  }

  updateFullscreen() {
    this.setState({ isFullscreen: isWindowFullscreen() });
  }

  toggleFullScreen() {
    const { isFullscreen } = this.state;
    setFullScreen(!isFullscreen);
  }

  render() {
    const { isFullscreen } = this.state;
    const { token, currentUser } = this.props;
    const platform = os.platform() === 'darwin' ? 'darwin' : 'win32';
    // const platform = 'win32';
    const barProps = {
      className: 'app-title-bar',
      title: 'Pipl Facebook Testbed',
      onCloseClick: closeWindow,
      onMinimizeClick: minimizeWindow,
      controls: true
    };

    const cloneWithProps = (child) => cloneElement(child, { platform, token, currentUser });

    return (
      <MuiThemeProvider>
        <div className={`app-wrapper ${platform}-background`}>
          {
            platform === 'darwin' ? (
              <DarTitleBar
                {...barProps}
                isFullscreen={isFullscreen}
                onResizeClick={this.toggleFullScreen.bind(this)}
              />
            ) : (
              <WinTitleBar
                {...barProps}
                isMaximized={isFullscreen}
                onMaximizeClick={setFullScreen.bind(this, true)}
                onRestoreDownClick={setFullScreen.bind(this, false)}
              />
            )
          }
          <div className={`app-container ${platform}-app-wrapper`}>
            {Children.map(this.props.children, (child) => cloneWithProps(child))}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(state => ({
  token: state.token,
  currentUser: state.currentUser
}))(App);
