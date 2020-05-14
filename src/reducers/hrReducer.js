import { hrActionTypes } from '~/actions/types';

const initialState = {
  isFetching: false,
  statusMessage: '',
  heartRates: []
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case hrActionTypes.HEART_RATE_INIT:
      return {
        ...initialState
      };
    case hrActionTypes.HEART_RATE_GET_ALL_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case hrActionTypes.HEART_RATE_GET_ALL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        heartRates: action.payload.heartRates
      };
    case loginActionTypes.HEART_RATE_GET_ALL_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case hrActionTypes.HEART_RATE_FILTER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case hrActionTypes.HEART_RATE_FILTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        heartRates: action.payload.heartRates
      };
    case hrActionTypes.HEART_RATE_FILTER_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default: 
      return state
  }
}
