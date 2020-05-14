import { all } from 'redux-saga/effects'
import login from './loginSagas';
import signup from './signupSagas';

export default function* root() {
  yield all([
    login(),
    signup()
  ])
}
