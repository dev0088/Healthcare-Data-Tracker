import * as types from './types/signupActionTypes';

export function initSignup() {
  return {
    type: types.SIGNUP_INIT
  }
}

export function trySignup(signupInfo) {
  return {
    type: types.SIGNUP_REQUEST,
    payload: { signupInfo }
  }
}

export function signUpSuccess() {
  return {
    type: types.SIGNUP_SUCCESS,
    payload: { statusMessage: 'Signup success.' }
  }
}

export function signUpFailed(errorMessage) {
  return {
    type: types.SIGNUP_FAILURE,
    payload: { statusMessage: errorMessage }
  }
}

export function clearMessage() {
  return {
    type: types.CLEAR_MESSAGE
  }
}

export function tryFbSignup() {
  return {
    type: types.FACEBOOK_SIGNUP_REQUEST
  }
}

export function fbSignupSuccess(fbProfile) {
  return {
    type: types.FACEBOOK_SIGNUP_SUCCESS,
    payload: {
      name: fbProfile.name,
      email: fbProfile.email,
      birthday: fbProfile.birthday || '',
      phoneNumber: fbProfile.phoneNumber || '',
      fbProfile: fbProfile,
      statusMessage: 'Signed up with Facebook successfully.'
    }
  }
}

export function fbSignupFailed(error) {
  return {
    type: types.FACEBOOK_SIGNUP_FAILED,
    payload: {
      statusMessage: error.message
    }
  }
}

export function fbSignupCanceled() {
  return {
    type: types.FACEBOOK_SIGNUP_CANCELED
  }
}