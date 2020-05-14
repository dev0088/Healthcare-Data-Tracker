import React from 'react';
import {
  View,
  Animated,
  Keyboard,
  Platform,
  LayoutAnimation,
  TouchableWithoutFeedback,
} from 'react-native';
import KeyboardAvoidingView from './KeyboardAvoidingView';
import LogoView from './LogoView';
import commonStyles from '~/common/styles';
import { colors, H, em } from '~/common/constants';
import { ScrollView } from 'react-native-gesture-handler';

export default class SignupWrapperView extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  
  state = {
    anim: new Animated.Value(0),
    isKeyboardVisible: false,
    keyboardHeight: 0,
  };

  UNSAFE_componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );
  }

  componentDidMount() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      isKeyboardVisible: true,
      keyboardHeight: e.endCoordinates.height
    });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false, keyboardHeight: 0 });
  }

  fadeIn(delay, from = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }

  renderContent = () => {
    const { children } = this.props;
    const { isKeyboardVisible, keyboardHeight } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{height: H*em, backgroundColor: colors.secondaryBackground}}>
          <View
            style={[
              {flex: 1},
              commonStyles.container.logoViewContainer
            ]}
          >
            <LogoView styles={this.fadeIn(0)} />
          </View>
          <View
            style={[
              {flex: 2},
              commonStyles.container.authWrapperContainer
            ]}
          >
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
   
    const { isKeyboardVisible } = this.state;
    return (
        <ScrollView styles={{height: H*em, }}>
          {this.renderContent()}
        </ScrollView>
    )
  }
}
