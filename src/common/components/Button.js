import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { em, colors } from '~/common/constants';

export default class Button extends React.Component {

  renderDefaultButton = () => {
    const { bgColor } = this.props

    return (
      <View style={{...styles.defaultButtonStyle, backgroundColor: bgColor}}>
        {this.renderContent()}
      </View>
    )
  }

  renderGradientButton = () => {
    const { bgGradientStart, bgGradientEnd } = this.props
    return (
      <LinearGradient
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
        start={{x: 0.5, y: 1}}
        end={{x: 1, y: 1}}
        colors={[bgGradientStart, bgGradientEnd]}
      >
        {this.renderContent()}
      </LinearGradient>
    )
  };

  renderContent = () => {
    const {
      caption, loading, textSize, textColor,
      icon, iconAlign, iconColor, disableTintColor,
      children
    } = this.props
    return (
      <>
        {loading ?
          <ActivityIndicator color={textColor} />
        :
          children ? children :
          <>
            {icon && iconAlign=='left-corner' &&
              <Image
                resizeMode='contain'
                source={icon}
                style={[
                  styles.imageStyle,
                  !disableTintColor && {tintColor: iconColor},
                  {position: 'absolute', left: 10, top: 10}
                ]}
              />
            }
            {icon && iconAlign=='left' &&
              <Image
                resizeMode='contain'
                source={icon}
                style={[
                  styles.imageStyle,
                  !disableTintColor && {tintColor: iconColor},
                  {marginRight: 10}
                ]}
              />
            }
            <Text style={{fontSize: textSize, color: textColor}}>
              {caption}
            </Text>
            {icon && iconAlign=='right' &&
              <Image
                resizeMode='contain'
                source={icon}
                style={[
                  styles.imageStyle,
                  !disableTintColor && {tintColor: iconColor},
                  {marginLeft: 10}
                ]}
              />
            }
            {icon && iconAlign=='right-corner' &&
              <Image
                resizeMode='contain'
                source={icon}
                style={[
                  styles.imageStyle,
                  !disableTintColor && {tintColor: iconColor},
                  {position: 'absolute', right: 10, top: 10}
                ]}
              />
            }
          </>        
        }
      </>
    )
  };

  render() {
    const {
      onPress,
      bgGradientStart,
      containerHeight,
      borderRadius,
      disabled,
      width
    } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        accessibilityTraits='button'
        style={{
          ...styles.buttonStyle,
          height: containerHeight,
          borderRadius,
          width
        }}
        disabled={disabled}
      >
        { !bgGradientStart
          ? this.renderDefaultButton()
          : this.renderGradientButton()
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    // width: '100%',
    // overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  defaultButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageStyle: {
    maxWidth: 20,
    maxHeight: 20,
  },
})

Button.defaultProps = {
  containerHeight: 50*em,
  borderRadius: 20*em,
  textSize: 17*em,
  textColor: colors.buttonText,
  bgColor: '#fff',
  iconAlign: 'left',
  iconColor: '#fff',
  width: '100%',
  disabled: false,
  borderShadow: true,
  disableTintColor: false
}