require('./styles.css');

import React, { Component, PropTypes } from 'react';
import { has } from 'lodash';

import { login } from 'SessionActions';

import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';

import Graph from 'Graph';

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
    'key': 'AaIhD9VrmE6P8kpNwmrXfbNvDgHeSwxbMs2BXTcmJb-lVjMaEpMtj51o1IjmhHvTGmnbGrPwkYOUTmLYDGKl-YT2i-5KF5stZth_G4ZYyrzbvg',
    'text': 'Seth Paye',
    'size': 8,
    'x': 402,
    'y': 430.5,
  },
  {
    'key': 'AaJZc6AoHKwg-vxUYKbDF7KVoGJVD30CddzwzpWu97mtWps0Ib8A7uaTzm7M8wjzhMUX3q-qKCwWbl47xxVTbqnEBsqsgLlVs7ydD_R53WfayQ',
    'text': 'Jerad Hobgood',
    'size': 8,
    'x': 278,
    'y': 424.5,
  },
  {
    'key': '10211494116972445',
    'text': 'Jonathan Gertig',
    'size': 8,
    'x': 227,
    'y': 385.5,
  },
  {
    'key': 'Skookum-Skookum Digital Works',
    'text': 'Skookum',
    'size': 4,
    'x': 524,
    'y': 417.5,
  },
  {
    'key': 'Murray State University-Murray State University',
    'text': 'Murray State University',
    'size': 4,
    'x': 262,
    'y': 415.5,
  },
];
const links = [
  {
    'source': 'AaId5VEyv5vUFINPlX-FjgrLKhbwQbuB8lxXOdjfWfjBmKjo-gjZZP-LRHm9QiWX5JO68xJftWo4teuVj2dlzep3EFf-gggeWUlxTSGRnomkEw',
    'target': 'Skookum-Skookum Digital Works',
    'key': 'AaId5VEyv5vUFINPlX-FjgrLKhbwQbuB8lxXOdjfWfjBmKjo-gjZZP-LRHm9QiWX5JO68xJftWo4teuVj2dlzep3EFf-gggeWUlxTSGRnomkEw-Skookum-Skookum Digital Works',
    'size': 1,
  },
  {
    'source': '10211494116972445',
    'target': 'Skookum-Skookum Digital Works',
    'key': '10211494116972445-Skookum-Skookum Digital Works',
    'size': 1,
  },
  {
    'source': 'AaIhD9VrmE6P8kpNwmrXfbNvDgHeSwxbMs2BXTcmJb-lVjMaEpMtj51o1IjmhHvTGmnbGrPwkYOUTmLYDGKl-YT2i-5KF5stZth_G4ZYyrzbvg',
    'target': 'Skookum-Skookum Digital Works',
    'key': 'AaIhD9VrmE6P8kpNwmrXfbNvDgHeSwxbMs2BXTcmJb-lVjMaEpMtj51o1IjmhHvTGmnbGrPwkYOUTmLYDGKl-YT2i-5KF5stZth_G4ZYyrzbvg-Skookum-Skookum Digital Works',
    'size': 1,
  },
  {
    'source': '10211494116972445',
    'target': 'Skookum-Skookum Digital Works',
    'key': '10211494116972445-Skookum-Skookum Digital Works',
    'size': 1,
  },
  {
    'source': 'AaJZc6AoHKwg-vxUYKbDF7KVoGJVD30CddzwzpWu97mtWps0Ib8A7uaTzm7M8wjzhMUX3q-qKCwWbl47xxVTbqnEBsqsgLlVs7ydD_R53WfayQ',
    'target': 'Murray State University-Murray State University',
    'key': 'AaJZc6AoHKwg-vxUYKbDF7KVoGJVD30CddzwzpWu97mtWps0Ib8A7uaTzm7M8wjzhMUX3q-qKCwWbl47xxVTbqnEBsqsgLlVs7ydD_R53WfayQ-Murray State University-Murray State University',
    'size': 1,
  },
  {
    'source': '10211494116972445',
    'target': 'Murray State University-Murray State University',
    'key': '10211494116972445-Murray State University-Murray State University',
    'size': 1,
  },
];

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
        <h2>She how you and your friends are connected!</h2>
        <div className="Home-center">
          <h2 />
          <GridList cellHeight={50} cols={5} className="Home-grid" >
            {images.map((img, i) => (
              <GridTile key={i}>
                <img src={img} />
              </GridTile>
            ))}
          </GridList>
          <Graph width={270} height={270} nodes={nodes} links={links} />
        </div>
        <h2>Login now and try!</h2>
        <RaisedButton
          label="Login"
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
