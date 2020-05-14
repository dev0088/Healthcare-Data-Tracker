import { StyleSheet } from "react-native";
import {em, colors, H } from '~/common/constants';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20*em,
    backgroundColor: colors.secondaryBackground,
    // height: H*em
  },
  sectionContainer: {
    width: '100%',
    padding: 20*em,
    backgroundColor: colors.light,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.red,
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'left',
    marginBottom: 20*em,
    height: 40*em
  },
  sectionDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text,
    fontStyle: 'italic'
  }
});