import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './SettingsViewStyle';

export default class DashboardView extends React.Component {

  onClickSignOut = () => {
    this.props.authActions.initLogin();
    Actions['main']();
  };

  render() {
    const { _t } = this.props.appActions;
    return (
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            onPress={this.onClickSignOut}
            activeOpacity={0.8}
            accessibilityTraits='button'
          >
            <Text style={styles.sectionTitle}>{_t('Sign Out')}</Text>
          </TouchableOpacity>
        </View> 
      </View>
    )
  }
}

