require('./styles.css');

import React, { Component, PropTypes } from 'react';
import { isEqual, chunk } from 'lodash';

import Avatar from 'material-ui/Avatar';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import OpenInNew from 'material-ui/svg-icons/action/open-in-new';
import FlatButton from 'material-ui/FlatButton';
import PrevIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import NextIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

const SelectableList = makeSelectable(List);

const chunkUnit = 10;

class FriendsList extends Component {
  state = { selectedIndex: 0, pagingIndex: 0 };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.friends, nextProps.friends)) {
      nextProps.onSelection(nextProps.friends[this.state.selectedIndex], this.state.selectedIndex);
    }
  }

  componentDidMount() {
    this.props.onSelection(this.props.friends[this.state.selectedIndex], this.state.selectedIndex);
  }

  handleSelection = (event, index) => {
    this.setState({ selectedIndex: index });
    this.props.onSelection(this.props.friends[index], index);
  };

  prev = () => {
    const { pagingIndex } = this.state;
    if (pagingIndex > 0) {
      this.setState({ pagingIndex: pagingIndex - 1 });
    }
  };

  next = () => {
    const { pagingIndex } = this.state;
    const { friends, hasMore, getMore } = this.props;
    const chunked = chunk(friends, chunkUnit);
    if (pagingIndex === chunked.length - 1 && hasMore) {
      getMore();
      if (chunked[pagingIndex].length === chunkUnit) {
        this.setState({ pagingIndex: pagingIndex + 1 });
      }
    } else if (pagingIndex < chunked.length) {
      this.setState({ pagingIndex: pagingIndex + 1 });
    }
  };

  render() {
    const { pagingIndex } = this.state;
    const { friends, hasMore } = this.props;
    const chunked = chunk(friends, chunkUnit);
    const atEnd = pagingIndex === chunked.length - 1 && !hasMore;
    return (
      <div className="FreindsList">
        <SelectableList
          value={this.state.selectedIndex}
          onChange={this.handleSelection}
        >
          <Subheader>Friends</Subheader>
          <Divider />
          {pagingIndex < chunked.length ? (chunked[pagingIndex].map((friend, i) => (
            <ListItem
              key={i + (chunkUnit * pagingIndex)}
              value={i + (chunkUnit * pagingIndex)}
              className="FreindsList-item"
              primaryText={friend.name}
              leftAvatar={<Avatar src={friend.picture.data.url} />}
              rightIcon={<OpenInNew />}
            />
          ))) : null}
        </SelectableList>
        <div className="FreindsList-actions">
          <FlatButton icon={<PrevIcon />} onClick={this.prev} disabled={pagingIndex === 0} />
          <FlatButton icon={<NextIcon />} onClick={this.next} disabled={atEnd} />
        </div>
      </div>
    );
  }

  static displayName = 'FriendsList';

  static propTypes = {
    friends: PropTypes.array.isRequired,
    onSelection: PropTypes.func.isRequired,
  };

}

export default FriendsList;
