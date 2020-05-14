import React from 'react';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, Text } from 'react-native';
import { Button, Spacer, AuthWrapperView } from '~/common/components';
import { facebookService } from '~/common/lib/facebook';
import { colors, em } from '~/common/constants';
import styles from './MainViewStyle';
import { facebookLogin, AUTH_PROVIDER as FACEBOOK_AUTH_PROVIDER } from '~/common/services/rn-firebase/facebook';
import { googleLogin, AUTH_PROVIDER as GOOGLE_AUTH_PROVIDER } from '~/common/services/rn-firebase/google';

const FACEBOOK_IMAGE = require('~/common/assets/images/png/facebook.png');
const GOOGLE_IMAGE = require('~/common/assets/images/png/google.png');

export default class MainView extends React.Component {
  state = {
    loggingInWithFacebook: false,
    loggingInWithGoogle: false
  };

  componentDidMount() {
    const { auth } = this.props;
    if (auth.isAuthenticated) Actions['home']();
  }

  onGoToLogin = () => Actions['login']();

  onGoToSignup = () => Actions['signup']();

  onFacebookLogin = async () => {
    const { appActions, authActions } = this.props;
    authActions.tryLoginWithSocial(FACEBOOK_AUTH_PROVIDER);
    this.setState({loggingInWithFacebook: true});
    const res = await facebookLogin();
    const {credential, error, errorType} = res;
    if (credential) authActions.loginWithSocialSuccess(credential);
    else if (error) {
      if (errorType === 'cancel') authActions.loginCanceled();
      else {
        appActions.setGlobalNotification({message: error.message, type: 'danger', duration: 6000});
        authActions.loginFailed(error);
      }
    }
    this.setState({loggingInWithFacebook: false});
  };

  onGoogleLogin = async () => {
    const { appActions, authActions } = this.props;
    authActions.tryLoginWithSocial(GOOGLE_AUTH_PROVIDER);
    this.setState({loggingInWithGoogle: true});
    const res = await googleLogin();
    console.log('===== googleLogin result: ', res);
    const {credential, error, errorType} = res;
    if (credential) authActions.loginWithSocialSuccess(credential);
    else if (error) {
      if (errorType === 'cancel') authActions.loginCanceled();
      else {
        appActions.setGlobalNotification({message: error.message, type: 'danger', duration: 6000});
        authActions.loginFailed(error);
      }
    }
    this.setState({loggingInWithGoogle: false});
  }

  _signIn = async (data) => {
    console.log('===== data: ', data);
  } 

  render() {
    const { _t } = this.props.appActions;
    const { loggingInWithFacebook, loggingInWithGoogle } = this.state;

    return (
      <AuthWrapperView>
        <React.Fragment>
          <Button
            onPress={this.onGoToLogin}
            caption={_t('LOGIN')}
          />
          <Spacer size={20*em} />
          <Button
            onPress={this.onGoToSignup}
            caption={_t('CREATE ACCOUNT')}
          />
          <Spacer size={20*em} />
          <Button
            onPress={this.onGoogleLogin}
            bgColor={'#00a9f2'}
            textColor={'#ffffff'}
            loading={loggingInWithGoogle}
            disabled={loggingInWithGoogle}
          >
            <Image
              resizeMode='contain'
              source={GOOGLE_IMAGE}
              style={styles.googleButtonImage}
            />
            <Text style={styles.googleButtonText}>
              {_t('CONTINUE WITH GOOGLE')}
            </Text>
          </Button>
          <Spacer size={20*em} />
          <Button
            onPress={this.onFacebookLogin}
            bgColor={'#00a9f2'}
            textColor={'#ffffff'}
            loading={loggingInWithFacebook}
            disabled={loggingInWithFacebook}
          >
            <Image
              resizeMode='contain'
              source={FACEBOOK_IMAGE}
              style={styles.facebookButtonImage}
            />
            <Text style={styles.facebookButtonText}>
              {_t('CONTINUE WITH FACEBOOK')}
            </Text>
          </Button>
          <Spacer size={30*em} />
        </React.Fragment>
      </AuthWrapperView>
    );
  }
}
