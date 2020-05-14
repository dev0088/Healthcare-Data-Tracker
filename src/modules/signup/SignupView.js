import React from 'react';
import { Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Button,
  Spacer,
  SignupWrapperView
} from '~/common/components';
import { em, colors } from '~/common/constants';
import commonStyles from '~/common/styles';

export default class SignupView extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDay: ''
  };

  onCreateAccount = () => {
    const {
      firstName, lastName, email, password, birthDay
     } = this.state;

     this.props.signupActions.trySignup({
      firstName,
      lastName,
      email,
      password,
      birthDay
     });
  };

  onGoBack = () => Actions['main']();

  onChangeText = (name, value) => this.setState({[name]: value});

  render() {
    const {
      firstName, lastName, email, password, birthDay
     } = this.state;
    const { _t } = this.props.appActions
    const { signup } = this.props;
    const signingUp = signup.isFetching && !signup.isSocialSigup;
    
    return (
      <SignupWrapperView onGoBack={this.onGoBack} title={_t('Sign Up')}>
        <React.Fragment>
          <Text
            style={[
              {textAlign: 'center'},
              commonStyles.text.descriptionBlack
            ]}
          >
            {_t("Create an account to get started with your workout tracking experience!")}
          </Text>
          <Spacer size={20*em} />
          <TextInput
            style={[
              commonStyles.textInput.default,
              commonStyles.text.default
            ]} 
            placeholder={'First Name'}
            placeholderTextColor={colors.placeholderText}
            value={firstName}
            onChangeText={(text) => this.onChangeText('firstName', text)}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
          <Spacer size={20*em} />
          <TextInput
            style={[
              commonStyles.textInput.default,
              commonStyles.text.default
            ]} 
            placeholder={'Last Name'}
            placeholderTextColor={colors.placeholderText}
            value={lastName}
            onChangeText={(text) => this.onChangeText('lastName', text)}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
          <Spacer size={10*em} />
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
          <Spacer size={10*em} />
          <TextInput
            style={[
              commonStyles.textInput.default,
              commonStyles.text.default
            ]}
            placeholder={'Password'}
            placeholderTextColor={colors.placeholderText} 
            value={password}
            onChangeText={(text) => this.onChangeText('password', text)}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            secureTextEntry={true}
          />
          <Spacer size={10*em} />
          <TextInput
            style={[
              commonStyles.textInput.default,
              commonStyles.text.default
            ]}
            placeholder={'Birthday'}
            placeholderTextColor={colors.placeholderText} 
            value={birthDay}
            onChangeText={(text) => this.onChangeText('birthDay', text)}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
          <Spacer size={20*em} />
          <Button
            onPress={this.onCreateAccount}
            caption={_t('CREATE ACCOUNT')}
            loading={signingUp}
            disabled={signingUp}
          />
          <Spacer size={30*em} />
        </React.Fragment>
      </SignupWrapperView>
    )
  }
}
