import types from '../types/auth'
import { getAuthToken } from '../utils/auth'

const isAuth = !!getAuthToken()

const initialState = {
  isAuth,

  // FETCH DATA
  info: {},
  isFetchError: false,

  // LOGIN
  isLoginLoading: false,
  isLoginError: false,
  loginErrorMsg: '',

  // REGISTER
  isRegisterLoading: false,
  isRegisterError: false,
  registerErrorMsg: '',
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER_SUCCESS: {
      return {
        ...state,
        info: action.payload.info,
        isFetchError: false,
      }
    }

    case types.FETCH_USER_FAILURE: {
      return {
        ...state,
        info: {},
        isFetchError: true,
      }
    }

    case types.LOGIN: {
      return {
        ...state,
        isLoginLoading: true,
      }
    }

    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        isLoginError: false,
        loginErrorMsg: '',
        isLoginLoading: false,
      }
    }

    case types.LOGIN_FAILURE: {
      return {
        ...state,
        isLoginError: true,
        loginErrorMsg: action.payload.errorMsg,
        isLoginLoading: false,
      }
    }

    case types.REGISTER: {
      return {
        ...state,
        isRegisterLoading: true,
      }
    }

    case types.REGISTER_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        isRegisterError: false,
        registerErrorMsg: '',
        isRegisterLoading: false,
      }
    }

    case types.REGISTER_FAILURE: {
      return {
        ...state,
        isRegisterError: true,
        registerErrorMsg: action.payload.errorMsg,
        isRegisterLoading: false,
      }
    }

    default: {
      return state
    }
  }
}
