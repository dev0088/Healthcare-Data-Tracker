import React, {Component} from 'react';
import {
  StyleSheet, View, Platform,
} from 'react-native';
// import { Root, Toast } from 'native-base';
import RootRoutes from '~/routes';
import { SplashView } from '~/common/components';

export default class AppView extends Component {
  state = {
    loaded: false
  };
  
  async UNSAFE_componentWillReceiveProps(nextProps) {
    const { app } = nextProps;
    const { loaded } = this.state;
    if (app.loaded && !loaded) {
      const _this = this;
      this.setState({loaded: true}, () => {
        _this.initialize();
      });
    }
  }

  async initialize() {
    const { appActions, loginActions, signupActions } = this.props;

    appActions.setGlobalNotification({message: null, type: ''});
    // loginActions.initLogin();
    // signupActions.initSignup();
  }

  showToast() {
    const { _t } = this.props.appActions;
    const { appActions, app } = this.props;

    if (app.globalNotification && app.globalNotification.message) {
      const { message, type, duration } = app.globalNotification;
      Toast.show({
        type: type,
        text: _t(message),
        position: 'top',
        duration: duration,
        buttonText: 'X',
        buttonTextStyle: { color: "#ffffff" }
      });
      appActions.setGlobalNotification({message: null, type: ''});
    }
  }
  
  render() {
    const { loaded } = this.state;

    // if (loaded) this.showToast();

    return (
      <View style={styles.safeArea}>
        <View style={styles.container}>
        { loaded 
          ? (
            // <Root>
              <RootRoutes />
            // </Root>
          ):(
            <SplashView />
          )
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#000'
  }  
});
