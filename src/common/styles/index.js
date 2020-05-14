import { em, colors } from '../constants';

export default {
  text: {
    default: {
      fontSize: 15*em, color: colors.text
    },
    title: {
      fontSize: 22*em, color: colors.title, fontWeight: 'bold'
    },
    defaultWhite: {
      fontSize: 15*em, color: '#ffffff'
    },
    titleWhite: {
      fontSize: 22*em, color: '#ffffff', fontWeight: 'bold'
    },
    titleBlack: {
      fontSize: 22*em, color: colors.title, fontWeight: 'bold'
    },
    buttonTitle: {
      fontSize: 17*em, color: colors.buttonText
    },
    descriptionBlack: {
      fontSize: 17*em, color: colors.title
    }
  },
  textInput: {
    default:  {
      height: 40*em,
      fontSize: 17*em,
      borderWidth: 1,
      borderColor: colors.text,
      backgroundColor: '#ffffff',
      width: '100%',
      paddingLeft: 20*em,
      paddingRight: 20*em
    }
  },
  container: {
    authWrapperContainer: {
      width: '100%',
      padding: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 20*em
    },
    logoViewContainer: {
      width: '100%',
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
}