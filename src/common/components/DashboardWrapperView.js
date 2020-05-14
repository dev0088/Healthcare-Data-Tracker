import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

export default class DashboardWrapperView extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          {children}
        </SafeAreaView>
      </>
    )
  }
}
