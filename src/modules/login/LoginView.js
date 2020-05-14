import React from 'react';
import { TouchableOpacity, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spacer, Button, AuthWrapperView } from '~/common/components';
import commonStyles from '~/common/styles';
import { em, colors } from '~/common/constants';
import { AUTH_PROVIDER as EMAL_AUTH_PROVIDER } from '~/common/services/rn-firebase/auth';

export default class LoginView extends React.Component {
  state = {
    email: this.props.auth && this.props.auth.email,
    password: this.props.auth && this.props.auth.password,
  };

  onLogin = () => {
    const { email, password } = this.state;
    this.props.authActions.tryLogin({email, password, EMAL_AUTH_PROVIDER});
  };

  onGoBack = () => Actions['main']();

  goToReset = () => Actions['forgotPasword']();

  onChangeEmail = (email) => this.setState({email});
  onChangePassword = (password) => this.setState({password});

  render() {
    const { email, password } = this.state
    const { _t } = this.props.appActions
    const { auth } = this.props;
    const { isFetching, isSocial } = auth;
    const isLoggingIn = (isFetching && !isSocial);

    return (
      <AuthWrapperView>
        <React.Fragment>
          <Text style={[{textAlign: 'center'}, commonStyles.text.descriptionBlack]}>
            {_t("Welcome Back!")}
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
            onChangeText={(email) => this.onChangeEmail(email)}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
          <Spacer size={10*em} />
          <TextInput
            style={[
              commonStyles.textInput.default,
              commonStyles.text.default
            ]} 
            placeholder={'Password'}
            placeholderTextColor={colors.placeholderText}
            value={password}
            onChangeText={(password) => this.onChangePassword(password)}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            secureTextEntry={true}
          />
          <Spacer size={20*em} />
          <Button
            onPress={this.onLogin}
            caption={_t('Login')}
            loading={isLoggingIn}
            disabled={isLoggingIn}
          />
          <Spacer size={30*em} />
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
            onPress={() => this.goToReset()}
          >
           <Text style={commonStyles.text.descriptionBlack}>
              {_t("Forgot Password?")}
            </Text>
          </TouchableOpacity>
          <Spacer size={60*em} />
        </React.Fragment>
      </AuthWrapperView>
    );
  }
}
