import React from 'react';
import { LoginButton, LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

class FacebookService {
  constructor() {
    this.requestManager = new GraphRequestManager()
  }

  makeLoginButton = (callback) => {
    return (
      <LoginButton
        readPermissions={["public_profile"]}
        onLoginFinished={(error, result) => {
          if (error) {

          } else if (result.isCancelled) {

          } else {
            AccessToken.getCurrentAccessToken()
              .then((data) => {
                callback(data.accessToken)
              })
              .catch(error => {
                console.log(error)
              })
          }
        }} />
    )
  };

  makeLogoutButton = (callback) => {
    return (
      <LoginButton onLogoutFinished={() => { callback() }} />
    )
  };

  loginWithLoginManager = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    const currentToken = await AccessToken.getCurrentAccessToken();
    if (result.isCancelled) {
      console.log('==== Login cancelled');
      return {action: 'cancel', data: null, token: null};
    }
    console.log('==== Login success with result: ', result, currentToken);
    return {action: 'loggedin', data: result, token: currentToken};
  };

  fetchProfile = (token, callback) => {
    // const accessData = await AccessToken.getCurrentAccessToken();
    return new Promise((resolve, reject) => {
      const request = new GraphRequest(
        '/me',
        {
          httpMethod: 'GET',
          // version: 'v2.5',
          accessToken: token.accessToken,
          parameters: {
            'fields': {
              'string' : 'name,email,friends,birthday'
            }
          }
        },
        (error, result) => {
          if (result) {
            const profile = result;
            profile.avatar = `https://graph.facebook.com/${result.id}/picture`;
            resolve(profile);
          } else {
            reject(error);
          }
        }
      );
      this.requestManager.addRequest(request).start();
    });
  };

  logout = () => {
    LoginManager.logOut();
  };
}

export const facebookService = new FacebookService();