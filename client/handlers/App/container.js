import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    friends: state.friends.list,
    hasMoreFriends: state.friends.nextLink !== '',
    addressLatLang: state.friends.addressLatLang,
  };
};

export default (component) => connect(mapStateToProps)(component);
