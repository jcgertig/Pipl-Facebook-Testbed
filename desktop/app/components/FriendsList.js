import React, { Component, PropTypes } from 'react';
import { isEqual, chunk, cloneDeep } from 'lodash';

import Avatar from 'material-ui/Avatar';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import OpenInNew from 'material-ui/svg-icons/action/open-in-new';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import PrevIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import NextIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import styles from '../styles/FriendsList.css';

const chunkUnit = 10;

const rightButtonStyle = {
  top: '4px',
  right: '0px',
  position: 'absolute',
};

const rightIconStyle = {
  userSelect: 'none',
  display: 'block',
  fill: 'rgb(117, 117, 117)',
  height: '24px',
  width: '24px',
  color: 'rgba(0, 0, 0, 0.870588)',
};

const avatarStyle = {
  userSelect: 'none',
  color: 'rgb(255, 255, 255)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  borderRadius: '50%',
  backgroundColor: 'rgb(188, 188, 188)',
  width: '40px',
  position: 'absolute',
  top: '8px',
  left: '16px',
  height: '40px',
};

const triggerSelection = (props, selected) => {
  props.onSelection(selected.map(i => ({ friend: props.friends[i], index: i })));
};

class FriendsList extends Component {

  static propTypes = {
    friends: PropTypes.array.isRequired,
    onSelection: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    getMore: PropTypes.func.isRequired,
  };

  state = { selectedIndexs: [0], pagingIndex: 0 };

  componentDidMount() {
    triggerSelection(this.props, this.state.selectedIndexs);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.friends, nextProps.friends)) {
      triggerSelection(nextProps, this.state.selectedIndexs);
    }
  }

  handleSelection(index) {
    const { selectedIndexs } = this.state;
    const newSelected = cloneDeep(selectedIndexs);
    const foundIndex = selectedIndexs.indexOf(index);
    if (foundIndex > -1) {
      newSelected.splice(foundIndex, 1);
    } else {
      newSelected.push(index);
    }
    this.setState({ selectedIndexs: newSelected });
    triggerSelection(this.props, newSelected);
    this.props.onSelection(newSelected.map(i => ({ friend: this.props.friends[i], index: i })));
  }

  prev() {
    const { pagingIndex } = this.state;
    if (pagingIndex > 0) {
      this.setState({ pagingIndex: pagingIndex - 1 });
    }
  }

  next() {
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
  }

  isSelected(index) {
    const { pagingIndex, selectedIndexs } = this.state;
    return selectedIndexs.indexOf(index + (chunkUnit * pagingIndex)) > -1;
  }

  render() {
    const { pagingIndex } = this.state;
    const { friends, hasMore } = this.props;
    const chunked = chunk(friends, chunkUnit);
    const atEnd = pagingIndex === chunked.length - 1 && !hasMore;
    return (
      <div className={styles.FreindsList}>
        <List>
          <Subheader>Friends</Subheader>
          <Divider />
          {pagingIndex < chunked.length ? (chunked[pagingIndex].map((friend, i) => (
            <div key={i + (chunkUnit * pagingIndex)}>
              <span
                className={`${styles['FriendsList-item']} ${this.isSelected.bind(this)(i) ? styles['is-selected'] : ''}`}
              >
                <div>
                  <div className={styles['FriendsList-item-inner']}>
                    <IconButton
                      onClick={this.handleSelection.bind(this, i + (chunkUnit * pagingIndex))}
                      style={rightButtonStyle}
                    >
                      <OpenInNew viewBox="0 0 24 24" style={rightIconStyle} />
                    </IconButton>
                    <Avatar src={friend.picture.data.url} style={avatarStyle} />
                    <div>{friend.name}</div>
                  </div>
                </div>
              </span>
            </div>
          ))) : null}
        </List>
        <div className={styles['FreindsList-actions']}>
          <FlatButton icon={<PrevIcon />} onClick={this.prev.bind(this)} disabled={pagingIndex === 0} />
          <FlatButton icon={<NextIcon />} onClick={this.next.bind(this)} disabled={atEnd} />
        </div>
      </div>
    );
  }

}

export default FriendsList;
