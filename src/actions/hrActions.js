import { Actions } from 'react-native-router-flux';
import * as types from './types/hrActionTypes';

export function initHeartRate() {
  return {
    type: types.HEART_RATE_INIT
  };
}

export function getAllHeartRates() {
  return {
    type: types.HEART_RATE_GET_ALL_REQUEST
  };
}

export function getAllHeartRateSuccess({heartRates}) {
  return {
    type: types.HEART_RATE_GET_ALL_SUCCESS,
    payload: {heartRates}
  }
}

export function getAllHeartRateFailed(errorMessage) {
  return {
    type: types.HEART_RATE_GET_ALL_FAILURE,
    payload: {
      statusMessage: errorMessage
    }
  };
}

export function filterHeartRate() {
  return {
    type: types.HEART_RATE_FILTER_REQUEST,
    payload: { email, password }
  }
}

export function filterHeartRateSuccess({heartRates}) {
  return {
    type: types.HEART_RATE_FILTER_SUCCESS,
    payload: {heartRates}
  };
}

export function filterHeartRateFailed(errorMessage) {
  return {
    type: types.HEART_RATE_FILTER_FAILURE,
    payload: {
      statusMessage: errorMessage
    }
  };
}

export function addHeartRate(heartRate) {
  return {
    type: types.HEART_RATE_ADD_REQUEST,
    payload: { heartRate }
  };
}

export function addHeartRateSuccess() {
  return {
    type: types.HEART_RATE_ADD_SUCCESS
  };
}

export function addHeartRateFailed(errorMessage) {
  return {
    type: types.HEART_RATE_ADD_FAILURE,
    payload: {
      statusMessage: errorMessage
    }
  };
}