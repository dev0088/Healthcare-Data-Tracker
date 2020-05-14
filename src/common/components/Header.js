import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { em } from '~/common/constants';
import commonStyles from '~/common/styles';

export default Header = ({ onGoBack, title }) => (
  <View
    style={{
      marginTop: 30*em,
      marginBottom: 30*em,
      flex: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 100*em
    }}
  >
    {onGoBack ?
      (<TouchableOpacity
        style={{
          width: 50*em,
          height: 50*em,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
        onPress={onGoBack}
      >
        <Image
          source={require('~/common/assets/images/png/arrow.png')}
          style={{width: 13*em, height: 20*em, tintColor: '#fff'}}
        />
      </TouchableOpacity>
      ) : (
        <View style={{flex: 1}}/>
      )
    }
    { title ? 
      (
        <Text
          style={[
            commonStyles.text.defaultWhite,
            {flex: 4, alignItems: 'center', justifyContent: 'center', textAlign: 'center'},
            {fontSize: 27*em, lineHeight: 50*em}
          ]}
        >
          {title}
        </Text>
      ) : (
        <View style={{flex: 4}}/>
      )
    }
    <View style={{flex: 1}}/>
  </View>
);