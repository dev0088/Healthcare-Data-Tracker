import { signupActionTypes } from '~/actions/types';

const initialState = {
  isFetching: false,
  statusMessage: '',
  statusMessageType: '',
  credential: null,
  signupInfo: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case signupActionTypes.SIGNUP_INIT:
      return {
        ...initialState,
        isFetching: false
      }
    case signupActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case signupActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        statusMessage: action.payload.statusMessage,
        statusMessageType: 'success'
      }
    case signupActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        statusMessage: action.payload.statusMessage,
        statusMessageType: 'danger'
      }
    case signupActionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        statusMessage: ''
      }
    case signupActionTypes.FACEBOOK_SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true,
        isSocialSigup: true,
      }
    case signupActionTypes.FACEBOOK_SIGNUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isSocialSigup: true,
        isFetching: false,
        statusMessage: action.payload.statusMessage,
        statusMessageType: 'success'
      }
    case signupActionTypes.FACEBOOK_SIGNUP_FAILED:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        isSocialSigup: true,
        statusMessage: action.payload.statusMessage,
        statusMessageType: 'danger'
      }
    case signupActionTypes.FACEBOOK_SIGNUP_CANCELED:
      return {
        ...state,
        isFetching: false,
        isSocialSigup: true,
        statusMessage: '',
        statusMessageType: ''
      }
    default: 
      return state
  }
}
