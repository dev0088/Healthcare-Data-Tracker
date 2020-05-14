import * as types from './types/appActionTypes';
import translate from '~/common/i18n';

export function setAppOpened() {
  return {
    type: types.SET_FIRST_OPEN,
  };
}

export function _t(message) {
  return (dispatch, getState) => {
    language = (getState() && getState().app) 
      ? getState().app.language
      : null;
    return translate(message, language)
  };
}

export function setGlobalNotification({message, type, duration}) {
  return {
    type: types.SET_GLOBAL_NOTIFICATION,
    payload: {
      message, type, duration
    }
  };
}
