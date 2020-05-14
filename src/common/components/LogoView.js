import React, { Component } from 'react';
import { StyleSheet, View, Platform, Animated } from 'react-native';
import { em } from '~/common/constants';

const LOGO_IMAGE = require('~/common/assets/images/png/logo-nono-2x.png');

export default class LogoView extends Component {
  render() {
    const { style } = this.props;
    var animateViewStyle = [{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',    
        position: 'relative',
        width: '100%',
      }];
    style && animateViewStyle.push(style);
    return (
      <Animated.View style={animateViewStyle}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Animated.Image
            resizeMode="contain"
            style={{width: 180*em, height: 180*em}}
            source={LOGO_IMAGE}
          />
        </View>
      </Animated.View>
    );
  }
}
