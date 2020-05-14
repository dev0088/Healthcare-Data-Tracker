import { StyleSheet } from "react-native";
import {em, colors, H } from '~/common/constants';

export default styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20*em,
    backgroundColor: colors.secondaryBackground,
    height: H*em
  },
  body: {
    width: '100%',
    backgroundColor: colors.light,
  },
  sectionContainer: {
    width: '100%',
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
    fontSize: 18,
    fontWeight: '400',
    color: colors.text,
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
  },
  addContainer: {
    width: '100%',
    marginBottom: 20*em,
    // height: 90*em
  },
  addSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addEditsContainer: {
    flex: 2,
    height: 90*em
  },
  addEdit: {
    flex: 1,
    height: 40*em
  },
  addButton: {
    flex: 1,
    paddingLeft: 15*em
  },
  chartContainer: {
    width: '100%',
    marginTop: 50*em
  }
});