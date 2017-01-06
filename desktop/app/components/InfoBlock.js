import React, { Component, PropTypes } from 'react';
import { isUndefined, isEqual, cloneDeep } from 'lodash';

import { buildConnections, mapping } from '../utils/pipl';
import { genNodes } from '../utils/graph';

import Graph from './Graph';
import PiplOption from './PiplOption';

import styles from '../styles/InfoBlock.css';

const modUser = (user) => {
  const modedUser = cloneDeep(user);
  modedUser.id = modedUser.uid;
  modedUser.pipl = { value: 1, pipl: modedUser.piplData.base_data };
  return modedUser;
};

const height = 815;


class InfoBlock extends Component {
  static propTypes = {
    user: PropTypes.object,
    users: PropTypes.array,
    currentUser: PropTypes.object,
    addressLatLang: PropTypes.object,
  };

  static defaultProps = {
    users: [],
  };

  state = {
    compared: {},
    comparing: false,
    nodes: [],
    links: []
  };

  componentWillReceiveProps(nextProps) {
    const { compared } = this.state;
    const { addressLatLang, currentUser } = nextProps;
    const users = cloneDeep(nextProps.users);
    console.log('USERS', users.length);
    if (users.length > 1 && !isEqual(users, this.props.users)) {
      users.push({ friend: modUser(currentUser), index: -1 });
      this.setState({ comparing: true, nodes: [], links: [] }, () => {
        for (const userA of users) {
          const otherUsers = users.filter(user => user.friend.id !== userA.friend.id)
                              .map(user => user.friend);
          buildConnections(addressLatLang, userA.friend, otherUsers, compared)
            .then(val => {
              const newCompared = val.compared;
              const { nodes, links } = genNodes(mapping, users, newCompared, this.state.nodes, this.block.clientWidth, height);
              console.log('DONE COMPARING');
              return this.setState({ compared: val.allCompared, comparing: false, nodes, links });
            })
            .catch(() => {});
        }
      });
    } else if (users.length <= 1) {
      this.setState({ nodes: [], links: [] });
    }
  }

  renderPipl() {
    const { users } = this.props;
    const { nodes, links, comparing } = this.state;
    if (users.length === 1) {
      return users.map(({ friend: { pipl, name } }, i) => {
        const key = `${name}-${i}`;
        if (isUndefined(pipl)) {
          return <PiplOption basic isLoading text="Getting Pipl Data For Friend" key={key} />;
        }

        if (pipl === null) {
          return <PiplOption basic text="No Pipl Data Available For Selected Friend" key={key} />;
        }

        return (
          <PiplOption option={pipl.pipl} value={pipl.value} name={name} key={key} />
        );
      });
    }

    if (users.length > 1) {
      if (comparing) {
        return <PiplOption basic isLoading text="Comparing Friends" />;
      }

      return <Graph width={this.block.clientWidth} height={height} nodes={nodes} links={links} />;
    }
    return <PiplOption basic text="Select friends from the list to view or compare" />;
  }

  render() {
    const { user } = this.props;
    if (user !== null) {
      return (
        <div
          className={styles.InfoBlock}
          ref={block => { if (block !== null) { this.block = block; } }}
        >
          {this.renderPipl.bind(this)()}
        </div>
      );
    }
    return null;
  }

}

export default InfoBlock;
