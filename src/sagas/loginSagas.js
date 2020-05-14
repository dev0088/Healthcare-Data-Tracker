import { put, takeLatest, call } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { loginActionTypes } from '~/actions/types';
import { loginInWithEmailPassword } from '~/common/services/rn-firebase/auth';
import {
  getCurrentUserInfo,
  createSocialAccount
} from '~/common/services/rn-firebase/database';
import { AppActions, LoginActions } from '~/actions';

const { setGlobalNotification } = AppActions;
const { loginSuccess, loginFailed } = LoginActions;

export default function* watcher() {
  yield takeLatest(loginActionTypes.LOGIN_REQUEST, LoginWithEmail);
  yield takeLatest(loginActionTypes.LOGIN_SUCCESS, processLoginSuccess);
  yield takeLatest(
    loginActionTypes.SOCIAL_LOGIN_SUCCESS,
    processSocialLoginSuccess
  );
}

function* LoginWithEmail(action) {
  const {email, password} = action.payload;
  const res = yield call(loginInWithEmailPassword,{email, password});
  console.log('===== res: ', res);
  if (res.error) {
    yield put(loginFailed(res.error));
    yield put(setGlobalNotification({
      message: res.error,
      type: 'danger',
      duration: 6000
    }));
    return;
  }
  yield put(loginSuccess(res.credential));
}

export function* processLoginSuccess() {
  Actions['dashboard']();
}

export function* processSocialLoginSuccess(action) {
  const resCreateUser = yield call(
    createSocialAccount,
    action.payload.credential
  );
  if(resCreateUser) Actions['dashboard']();
}