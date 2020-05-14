import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import * as AppActions from '~/actions/appActions';
import * as LoginActions from '~/actions/loginActions';
import HRView from './HRView';

const mapStateToProps = state => ({
  app: state.app || {}
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(AppActions, dispatch)
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HRView);