import { loginActionTypes } from '~/actions/types';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  statusMessage: '',
  credential: null,
  isSocial: false,
  authProvider: null
}

export default function reducer(state = initialState, action) {
  const payload = action.payload;
  switch(action.type) {
    case loginActionTypes.LOGIN_INIT:
      return {
        ...initialState
      };
    case loginActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isSocial: false
      };
    case loginActionTypes.LOGIN_SUCCESS:
    case loginActionTypes.SOCIAL_LOGIN_SUCCESS:
      var providerData = (
        payload.credential && 
        payload.credential.user) &&
        payload.credential.user.providerData;
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
        credential: payload.credential,
        authProvider: ( providerData && providerData[0] )
          ? providerData[0].providerId
          : 'password'
      };
    case loginActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        statusMessage: payload.statusMessage
      };
    case loginActionTypes.LOGIN_CANCELED:
        return {
          ...state,
          isFetching: false,
          statusMessage: '',
          isSocial: false
        };
    case loginActionTypes.LOGOUT_DONE:
      const logout_state = {
        ...state,
        isAuthenticated: false,
        credential: null,
        isSocial: false,
        authProvider: null
      };
    case loginActionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        statusMessage: ''
      };
    case loginActionTypes.TRY_SOCIAL_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isSocial: true,
        authProvider: payload.authProvider
      };
    case loginActionTypes.LOGIN_LOAD_PREV_STATE:
      return {
        ...action.payload.prevState
      }
    default: 
      return state
  }
}
