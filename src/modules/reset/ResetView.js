import React from 'react';
import { Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Button,
  Spacer,
  AuthWrapperView
} from '~/common/components';
import { em, colors } from '~/common/constants';
import commonStyles from '~/common/styles';
import { resetPasswordWithEmail } from '~/common/services/rn-firebase/auth';

export default class ResetView extends React.Component {
  state = {
    email: '',
    isResetting: false
  };

  onGoBack = () => Actions['login']();

  onChangeText = (name, value) => this.setState({[name]: value});

  onReset = async () => {
    this.setState({ isResetting: true });
    const res = await resetPasswordWithEmail(this.state.email);
    console.log('===== res: ', res);
    this.setState({ isResetting: false });
  };

  render() {
    const { _t } = this.props.appActions
    const { email, isResetting } = this.state;

    return (
      <AuthWrapperView>
        <React.Fragment>
          <Text
            style={[
              {textAlign: 'center'},
              commonStyles.text.descriptionBlack
            ]}
          >
            {_t("You'll Be Back In No Time!")}
          </Text>
          <Spacer size={20*em} />
          <TextInput
            style={[
              commonStyles.textInput.default,
              commonStyles.text.default
            ]}
            placeholder={'Email'}
            placeholderTextColor={colors.placeholderText} 
            value={email}
            onChangeText={(text) => this.onChangeText('email', text)}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
          <Spacer size={20*em} />
          <Button
            onPress={this.onReset}
            caption={_t('SEND EMAIL TO RESET PASSWORD')}
            loading={isResetting}
            disabled={isResetting}
          />
          <Spacer size={20*em} />
        </React.Fragment>
      </AuthWrapperView>
    )
  }
}
