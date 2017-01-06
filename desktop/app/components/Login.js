import React from 'react';

import { GridList, GridTile } from 'material-ui/GridList';
import { View as DarView, Text as DarText, Button as DarButton, ProgressCircle as DarCircle } from 'react-desktop/macOs';
import { View as WinView, Text as WinText, Button as WinButton, ProgressCircle as WinCircle } from 'react-desktop/windows';

import RenderByOS from './RenderByOS';

import { triggerLogin } from '../utils/windowActions';

import Graph from './Graph';

import styles from '../styles/Login.css';

const images = [
  'https://randomuser.me/api/portraits/thumb/men/9.jpg',
  'https://randomuser.me/api/portraits/thumb/women/6.jpg',
  'https://randomuser.me/api/portraits/thumb/men/27.jpg',
  'https://randomuser.me/api/portraits/thumb/women/4.jpg',
  'https://randomuser.me/api/portraits/thumb/women/73.jpg',
  'https://randomuser.me/api/portraits/thumb/women/58.jpg',
  'https://randomuser.me/api/portraits/thumb/women/37.jpg',
  'https://randomuser.me/api/portraits/thumb/women/46.jpg',
  'https://randomuser.me/api/portraits/thumb/men/17.jpg',
  'https://randomuser.me/api/portraits/thumb/men/54.jpg',
  'https://randomuser.me/api/portraits/thumb/women/27.jpg',
  'https://randomuser.me/api/portraits/thumb/women/71.jpg',
  'https://randomuser.me/api/portraits/thumb/women/62.jpg',
  'https://randomuser.me/api/portraits/thumb/women/56.jpg',
  'https://randomuser.me/api/portraits/thumb/women/10.jpg',
  'https://randomuser.me/api/portraits/thumb/men/45.jpg',
  'https://randomuser.me/api/portraits/thumb/men/55.jpg',
  'https://randomuser.me/api/portraits/thumb/men/93.jpg',
  'https://randomuser.me/api/portraits/thumb/women/86.jpg',
  'https://randomuser.me/api/portraits/thumb/men/35.jpg',
  'https://randomuser.me/api/portraits/thumb/women/64.jpg',
  'https://randomuser.me/api/portraits/thumb/men/25.jpg',
  'https://randomuser.me/api/portraits/thumb/women/45.jpg',
  'https://randomuser.me/api/portraits/thumb/women/66.jpg',
  'https://randomuser.me/api/portraits/thumb/women/42.jpg',
];

const nodes = [
  {
    key: 'AaIhD9VrmE6P8kpNwmrXfbNvDgHeSwxbMs2BXTcmJb-lVjMaEpMtj51o1IjmhHvTGmnbGrPwkYOUTmLYDGKl-YT2i-5KF5stZth_G4ZYyrzbvg',
    text: 'Seth Paye',
    size: 8,
    x: 75,
    y: 100,
  },
  {
    key: 'AaJZc6AoHKwg-vxUYKbDF7KVoGJVD30CddzwzpWu97mtWps0Ib8A7uaTzm7M8wjzhMUX3q-qKCwWbl47xxVTbqnEBsqsgLlVs7ydD_R53WfayQ',
    text: 'Jerad Hobgood',
    size: 8,
    x: 120,
    y: 185,
  },
  {
    key: '10211494116972445',
    text: 'Jonathan Gertig',
    size: 8,
    x: 95,
    y: 132,
  },
  {
    key: 'Skookum-Skookum Digital Works',
    text: 'Skookum',
    size: 4,
    x: 100,
    y: 72,
  },
  {
    key: 'Murray State University-Murray State University',
    text: 'Murray State Uni',
    size: 4,
    x: 115,
    y: 160,
  },
];
const links = [
  {
    source: '10211494116972445',
    target: 'Skookum-Skookum Digital Works',
    key: '10211494116972445-Skookum-Skookum Digital Works',
    size: 1,
  },
  {
    source: 'AaIhD9VrmE6P8kpNwmrXfbNvDgHeSwxbMs2BXTcmJb-lVjMaEpMtj51o1IjmhHvTGmnbGrPwkYOUTmLYDGKl-YT2i-5KF5stZth_G4ZYyrzbvg',
    target: 'Skookum-Skookum Digital Works',
    key: 'AaIhD9VrmE6P8kpNwmrXfbNvDgHeSwxbMs2BXTcmJb-lVjMaEpMtj51o1IjmhHvTGmnbGrPwkYOUTmLYDGKl-YT2i-5KF5stZth_G4ZYyrzbvg-Skookum-Skookum Digital Works',
    size: 1,
  },
  {
    source: 'AaJZc6AoHKwg-vxUYKbDF7KVoGJVD30CddzwzpWu97mtWps0Ib8A7uaTzm7M8wjzhMUX3q-qKCwWbl47xxVTbqnEBsqsgLlVs7ydD_R53WfayQ',
    target: 'Murray State University-Murray State University',
    key: 'AaJZc6AoHKwg-vxUYKbDF7KVoGJVD30CddzwzpWu97mtWps0Ib8A7uaTzm7M8wjzhMUX3q-qKCwWbl47xxVTbqnEBsqsgLlVs7ydD_R53WfayQ-Murray State University-Murray State University',
    size: 1,
  },
  {
    source: '10211494116972445',
    target: 'Murray State University-Murray State University',
    key: '10211494116972445-Murray State University-Murray State University',
    size: 1,
  },
];

class Home extends RenderByOS {

  darwinRender() {
    return (
      <DarView className={styles.Home} >
        <DarText>Pipl Facebook TestBed</DarText>
        <DarText>
          A simple application trying to get information about facebook friends
           through the pipl.com api.
        </DarText>
        <DarText>She how you and your friends are connected!</DarText>
        <DarView className={styles['Home-center']}>
          <GridList cellHeight={50} cols={5} className={styles['Home-grid']} >
            {images.map((img, i) => (
              <GridTile key={i}>
                <img role="presentation" src={img} />
              </GridTile>
            ))}
          </GridList>
          <Graph width={270} height={270} nodes={nodes} links={links} />
        </DarView>
        <DarText>Login now and try!</DarText>
        <DarButton onClick={triggerLogin} color="blue" >
          Login
        </DarButton>
      </DarView>
    );
  }

  win32Render() {
    return (
      <WinView className={styles.Home} >
        <WinText>Pipl Facebook TestBed</WinText>
        <WinText>
          A simple application trying to get information about facebook friends
           through the pipl.com api.
        </WinText>
        <WinText>She how you and your friends are connected!</WinText>
        <WinView className={styles['Home-center']}>
          <GridList cellHeight={50} cols={5} className={styles['Home-grid']} >
            {images.map((img, i) => (
              <GridTile key={i}>
                <img role="presentation" src={img} />
              </GridTile>
            ))}
          </GridList>
          <Graph width={270} height={270} nodes={nodes} links={links} />
        </WinView>
        <WinText>Login now and try!</WinText>
        <WinButton onClick={triggerLogin} color="#cc7f29" push >
          Login
        </WinButton>
      </WinView>
    );
  }

}

export default Home;
