import axios from './axios'
import types from '../types/auth'
import { setAuthToken, removeAuthToken, getAuthToken } from '../utils/auth'

/**
 * action creator:: start login
 *
 * @return  {{type: string}}
 */
const loginStart = () => ({
  type: types.LOGIN,
})

/**
 * action creator:: login success
 *
 * @return  {{type: string}}
 */
const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS,
})

/**
 * action creator:: login failure
 *
 * @return  {{type: string, payload: *}}
 */
const loginFailure = ({ errorMsg }) => ({
  type: types.LOGIN_FAILURE,
  payload: {
    errorMsg,
  },
})

/**
 * action creator:: start register
 *
 * @return  {{type: string}}
 */
const registerStart = () => ({
  type: types.REGISTER,
})

/**
 * action creator:: register success
 *
 * @return  {{type: string}}
 */
const registerSuccess = () => ({
  type: types.REGISTER_SUCCESS,
})

/**
 * action creator:: register failure
 *
 * @return  {{type: string, payload: *}}
 */
const registerFailure = ({ errorMsg }) => ({
  type: types.REGISTER_FAILURE,
  payload: {
    errorMsg,
  },
})

/**
 * action creator:: fetch user success
 *
 * @return  {{type: string}}
 */
const fetchSuccess = ({ info }) => ({
  type: types.FETCH_USER_SUCCESS,
  payload: {
    info,
  },
})

/**
 * action creator:: fetch user failure
 *
 * @return  {{type: string, payload: *}}
 */
const fetchFailure = () => ({
  type: types.FETCH_USER_FAILURE,
})

// OPERATIONS

/**
 * Opertation for trigger login error
 *
 * @param {string} errorMsg
 */
function onLoginError(errorMsg) {
  return dispatch => {
    dispatch(loginFailure({ errorMsg }))
  }
}

/**
 * Opertation for trigger register error
 *
 * @param {string} errorMsg
 */
function onRegisterError(errorMsg) {
  return dispatch => {
    dispatch(registerFailure({ errorMsg }))
  }
}

/**
 * Opertation for trigger login process
 *
 * @param {string} username
 * @param {string} password
 * @return {boolean}
 */
function login(username, password) {
  return async dispatch => {
    dispatch(loginStart())

    try {
      const { data } = await axios.post('/auth', {
        username,
        password,
      })

      // set token in cookie
      setAuthToken(data.token)

      dispatch(loginSuccess())
      return true
    } catch (error) {
      const { response } = error
      const errorMsg = response.data.message

      // remove token in cookie when login failed
      removeAuthToken()

      dispatch(loginFailure({ errorMsg }))
      return false
    }
  }
}

/**
 * Opertation for trigger register process
 *
 * @param {string} email
 * @param {string} username
 * @param {string} alias
 * @param {string} password
 * @param {string} rePassword
 * @return {boolean}
 */
function register(email, username, alias, password, rePassword) {
  return async dispatch => {
    dispatch(registerStart())

    try {
      const { data } = await axios.post('/register', {
        email,
        username,
        alias,
        password,
        rePassword,
      })

      // set token in cookie
      setAuthToken(data.token)

      dispatch(registerSuccess())
      return true
    } catch (error) {
      const { response } = error
      const errorMsg = response.data.message

      dispatch(registerFailure({ errorMsg }))
      return false
    }
  }
}

/**
 * Fetch user data from network
 */
function fetchUserData() {
  return async dispatch => {
    try {
      const { data: info } = await axios.get('/me', {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      dispatch(fetchSuccess({ info }))
    } catch (error) {
      dispatch(fetchFailure())
    }
  }
}

export default {
  login,
  register,
  onLoginError,
  onRegisterError,
  fetchUserData,
}
