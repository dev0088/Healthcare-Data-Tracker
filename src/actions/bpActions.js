import { Actions } from 'react-native-router-flux';
import * as types from './types/hrActionTypes';

export function initBlookPressure() {
  return {
    type: types.BLOOD_PRESSURE_INIT
  };
}

export function getAllBlookPressures() {
  return {
    type: types.BLOOD_PRESSURE_GET_ALL_REQUEST
  };
}

export function getAllBlookPressureSuccess({heartRates}) {
  return {
    type: types.BLOOD_PRESSURE_GET_ALL_SUCCESS,
    payload: {heartRates}
  }
}

export function getAllBlookPressureFailed(errorMessage) {
  return {
    type: types.BLOOD_PRESSURE_GET_ALL_FAILURE,
    payload: {
      statusMessage: errorMessage
    }
  };
}

export function filterBlookPressure() {
  return {
    type: types.BLOOD_PRESSURE_FILTER_REQUEST,
    payload: { email, password }
  }
}

export function filterBlookPressureSuccess({heartRates}) {
  return {
    type: types.BLOOD_PRESSURE_FILTER_SUCCESS,
    payload: {heartRates}
  };
}

export function filterBlookPressureFailed(errorMessage) {
  return {
    type: types.BLOOD_PRESSURE_FILTER_FAILURE,
    payload: {
      statusMessage: errorMessage
    }
  };
}

export function addBlookPressure(heartRate) {
  return {
    type: types.BLOOD_PRESSURE_ADD_REQUEST,
    payload: { heartRate }
  };
}

export function addBlookPressureSuccess() {
  return {
    type: types.BLOOD_PRESSURE_ADD_SUCCESS
  };
}

export function addBlookPressureFailed(errorMessage) {
  return {
    type: types.BLOOD_PRESSURE_ADD_FAILURE,
    payload: {
      statusMessage: errorMessage
    }
  };
}