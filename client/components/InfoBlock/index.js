/* global d3 */

require('./styles.css');

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { isString, get, has, isEqual, isUndefined, cloneDeep } from 'lodash';

import { keysToCamel } from 'utils/general';
import { buildConnections, clean } from 'utils/pipl';
import { updateGraph, enterNode, enterLink, updateNode, updateLink, genNodes } from 'utils/graph';

import CircularProgress from 'material-ui/CircularProgress';

const mapping = {
  'names': {
    node: false,
    collection: true,
    path: ({ first, last, middle, prefix, postfix }) => {
      return clean(`${prefix} ${first} ${middle} ${last} ${postfix}`);
    },
    text: 'Name',
  },
  'dob': {
    path: 'date_range.start',
    text: 'Date of Birth',
  },
  'gender': {
    path: 'content',
    text: 'Gender',
  },
  'phones': {
    collection: true,
    path: 'number',
    text: 'Phone Numbers',
  },
  'addresses': {
    collection: true,
    path: ({ house, street, city, state, zipCode, country }) => {
      return clean(`${house} ${street}, ${city}, ${state} ${zipCode}, ${country}`);
    },
    text: 'Addresses',
  },
  'relationships': {
    collection: true,
    path: (item) => {
      const { first, last, middle, prefix, postfix } = item.names[0];
      return clean(`${prefix} ${first} ${middle} ${last} ${postfix}`);
    },
    text: 'Relationships',
  },
  'jobs': {
    collection: true,
    path: (item) => {
      const { title, organization, dateRange } = item;
      return (
        <div style={{marginBottom: '10px'}}>
          <div>{title}</div>
          <div>{organization}</div>
          {dateRange ? <div>{dateRange.start} - {isUndefined(dateRange.end) ? 'Present' : dateRange.end}</div> : null}
        </div>
      );
    },
    text: 'Jobs',
  },
  'educations': {
    collection: true,
    path: (item) => {
      const { degree, school, dateRange } = item;
      return (
        <div style={{marginBottom: '10px'}}>
          <div>{degree}</div>
          <div>{school}</div>
          {dateRange ? <div>{dateRange.start} - {isUndefined(dateRange.end) ? 'Present' : dateRange.end}</div> : null}
        </div>
      );
    },
    text: 'Education',
  },
  'usernames': {
    node: false,
    collection: true,
    path: 'content',
    text: 'Usernames',
  },
};

const PiplOption = (props) => {
  const renderFromMapping = () => {
    const mapped = [];
    const addToMapped = (key, text, val) => {
      mapped.push((
        <div className="PiplOption-wrapper" key={key}>
          <div className="PiplOption-title">{text}</div>
          <div className="PiplOption-value">{val}</div>
        </div>
      ));
    };
    const addToCol = (mapObj, key, val) => {
      mapObj.push((
        <div className="PiplOption-value-option" key={key}>
          {val}
        </div>
      ));
    };
    for (const key of Object.keys(mapping)) {
      if (has(props.option, key)) {
        const base = props.option[key];
        const { path, text, collection } = mapping[key];
        let val = [];
        if (collection) {
          for (let i = 0; i < base.length; i++) {
            const _val = isString(path) ? get(base[i], path) : path(keysToCamel(base[i]), i);
            addToCol(val, `${key}-${i}`, _val);
          }
        } else {
          val = isString(path) ? get(base, path) : path(keysToCamel(base));
        }
        addToMapped(key, isString(text) ? text : text(keysToCamel(base)), val);
      }
    }
    return mapped;
  };

  return (
    <div className="PiplOption">
      {renderFromMapping()}
    </div>
  );
};

PiplOption.propTypes = {
  option: PropTypes.object.isRequired,
};

class Graph extends Component {

  componentWillMount() {
    this.force = d3.layout.force()
      .charge(-300)
      .linkDistance(50)
      .size([this.props.width, this.props.height]);
  }

  componentDidMount() {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.graph));
    this.force.on('tick', () => {
      // after force calculation starts, call updateGraph
      // which uses d3 to manipulate the attributes,
      // and React doesn't have to go through lifecycle on each tick
      this.d3Graph.call((sel) => updateGraph(sel, this.props.nodes));
    });
  }

  shouldComponentUpdate(nextProps) {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.graph));

    const d3Nodes = this.d3Graph.selectAll('.node')
      .data(nextProps.nodes, (node) => node.key);
    d3Nodes.enter().append('g').call((selection) => enterNode(selection, this.force));
    d3Nodes.exit().remove();
    d3Nodes.call(updateNode);

    const d3Links = this.d3Graph.selectAll('.link')
      .data(nextProps.links, (link) => link.key);
    d3Links.enter().insert('line', '.node').call(enterLink);
    d3Links.exit().remove();
    d3Links.call((sel) => updateLink(sel, nextProps.nodes));

    // we should actually clone the nodes and links
    // since we're not supposed to directly mutate
    // props passed in from parent, and d3's force function
    // mutates the nodes and links array directly
    // we're bypassing that here for sake of brevity in example
    this.force.nodes(nextProps.nodes).links(nextProps.links);
    this.force.start();

    return false;
  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <g ref={(i) => (this.graph = i)} />
      </svg>
    );
  }
}

class InfoBlock extends Component {
  state = { comparing: false, compared: {}, nodes: [], links: [] };

  componentWillReceiveProps(nextProps) {
    const { compared } = this.state;
    const { addressLatLang, currentUser } = nextProps;
    const modUser = (user) => {
      const _user = cloneDeep(user);
      _user.id = _user.uid;
      _user.pipl = { value: 1, pipl: _user.piplData.base_data };
      return _user;
    };
    const users = cloneDeep(nextProps.users);
    if (users.length > 0 && !isEqual(users, this.props.users)) {
      users.push({ friend: modUser(currentUser), index: -1 });
      for (const userA of users) {
        const otherUsers = users.filter(user => user.friend.id !== userA.friend.id).map(user => user.friend);
        buildConnections(addressLatLang, userA.friend, otherUsers, compared)
          .then(val => {
            const newCompared = val.compared;
            console.log('newCompared', newCompared);
            const { nodes, links } = genNodes(mapping, users, newCompared, this.state.nodes, this.block.clientWidth, this.block.clientHeight);
            this.setState({ compared: newCompared, nodes, links });
          });
      }
    }
  }

  renderPipl = () => {
    if (this.props.users.length === 1) {
      return this.props.users.map(({ friend }, i) => {
        if (!has(friend, 'pipl')) {
          return (
            <div className="PiplOption" key={`${friend.name}-${i}`}>
              <div className="PiplOption-wrapper is-loading">
                <div className="text-center" style={{ marginBottom: '10px'}}>
                  Getting Pipl Data For Friend
                </div>
                <CircularProgress size={80} thickness={5} />
              </div>
            </div>
          );
        }
        if (friend.pipl === null) {
          return (
            <div className="PiplOption" key={`${friend.name}-${i}`}>
              <div className="PiplOption-wrapper">
                <div className="text-center">
                  No Pipl Data Available For Selected Friend
                </div>
              </div>
            </div>
          );
        }
        return (
          <PiplOption
            option={friend.pipl.pipl}
            value={friend.pipl.value}
            name={friend.name}
            key={`${friend.name}-${i}`}
          />
        );
      });
    }
    if (this.props.users.length > 1) {
      if (Object.keys(this.state.compared).length === 0) {
        return (
          <div className="PiplOption">
            <div className="PiplOption-wrapper is-loading">
              <div className="text-center" style={{ marginBottom: '10px'}}>
                Comparing Friends
              </div>
              <CircularProgress size={80} thickness={5} />
            </div>
          </div>
        );
      }

      return (
        <Graph
          width={this.block.clientWidth}
          height={815}
          nodes={this.state.nodes}
          links={this.state.links}
        />
      );
    }
    return (
      <div className="PiplOption">
        <div className="PiplOption-wrapper">
          <div className="text-center">
            Select friends from the list to view or compare
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    if (user !== null) {
      return (
        <div className="InfoBlock" ref={block => { if (block !== null) { this.block = block; } }}>
          {this.renderPipl()}
        </div>
      );
    }
    return null;
  }

  static displayName = 'InfoBlock';

  static propTypes = {
    users: PropTypes.array,
    currentUser: PropTypes.object,
    addressLatLang: PropTypes.object,
  };

  static defaultProps = {
    users: [],
  };

}

export default InfoBlock;
