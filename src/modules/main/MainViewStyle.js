import { StyleSheet } from "react-native";
import {em, colors } from '~/common/constants';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20*em,
    backgroundColor: colors.secondaryBackground,
  },
  googleButtonImage: {
    width: 50,
    height: 50,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: colors.light
  },
  googleButtonText: {
    flex: 1,
    fontSize: 17*em,
    color: colors.light,
    textAlign: 'center'
  },
  facebookButtonImage: {
    width: 50,
    height: 30,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: '#00a9f2'
  },
  facebookButtonText: {
    flex: 1,
    fontSize: 17*em,
    color: colors.light,
    textAlign: 'center'
  }
});