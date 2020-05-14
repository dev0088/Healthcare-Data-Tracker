import { StyleSheet } from "react-native";
import {em, colors } from '~/common/constants';

export default styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.secondaryBackground,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  tile: {
    flex: 1,
    paddingTop: 10*em,
    paddingBottom: 10*em,
    paddingLeft: 10*em,
    paddingRight: 5*em,
    width: '50%',
    height: 150*em,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20*em,
    backgroundColor: colors.light,
    borderRadius: 8*em,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionDescription: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: colors.text,
    fontStyle: 'italic'
  }
});