import Cookie from 'js-cookie'
import { AUTH_COOKIE_KEY, AUTH_EXPIRE_IN } from '../configs/auth'

/**
 * Get token key from cookie
 */
export function getAuthToken() {
  return Cookie.get(AUTH_COOKIE_KEY)
}

/**
 * Set new token key to cookie
 * @param {*} token
 */
export function setAuthToken(token) {
  Cookie.set(AUTH_COOKIE_KEY, token, { expires: AUTH_EXPIRE_IN })
}

/**
 * remove token key from cookie
 */
export function removeAuthToken() {
  Cookie.set(AUTH_COOKIE_KEY, '', { expires: -1 })
}
