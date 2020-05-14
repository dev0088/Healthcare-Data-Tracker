import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import { firebase } from '@react-native-firebase/auth';

export const AUTH_PROVIDER = 'facebook.com';

export async function facebookLogin() {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile', 'email'
    ]);
    if (result.isCancelled)
      return {
        user: null,
        error: 'User cancelled request.',
        errorType: 'cancel'
      };
    
    // Get the access token
    const authData = await AccessToken.getCurrentAccessToken();

    if (!authData)
      return {
        user: null,
        error: 'Something went wrong obtaining the users access token.',
        errorType: 'token'
      };

    // Create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider
      .credential(authData.accessToken);

    // Login with credential
    const firebaseUserCredential = await firebase.auth()
      .signInWithCredential(credential);
    
    console.log('==== firebaseUserCredential: ', firebaseUserCredential);
    return {credential: firebaseUserCredential, error: null, errorType: null};
  } catch (e) {
    console.error('==== fb-sdk: error: ', e);
    return {credential: null, error: e, errorType: 'something'};
  }
}

export async function fetchProfile (token) {
  return new Promise((resolve, reject) => {
    const request = new GraphRequest(
      '/me',
      {
        httpMethod: 'GET',
        // version: 'v2.5',
        accessToken: token,
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
    const requestManager = new GraphRequestManager()
    requestManager.addRequest(request).start();
  });
};
