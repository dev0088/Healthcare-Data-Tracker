import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import * as AppActions from '~/actions/appActions';
import * as LoginActions from '~/actions/loginActions';
import BPView from './BPView';

const mapStateToProps = state => ({
  app: state.app || {},
  auth: state.auth || {},  
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(AppActions, dispatch),
  authActions: bindActionCreators(LoginActions, dispatch),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BPView);