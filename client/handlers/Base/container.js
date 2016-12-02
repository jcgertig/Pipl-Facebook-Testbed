import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    ModalContent: state.modal,
    token: state.token,
    currentUser: state.currentUser,
  };
};

export default (component) => connect(mapStateToProps)(component);
