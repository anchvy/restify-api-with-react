import _ from 'lodash'
import { getNumber } from './number'

/**
 * ValidateObjectExist
 * @typedef {Object} ValidateObjectExist
 * @property {boolean} isAllExist
 * @property {Array.<string>} notExistKeys
 */
/**
 * Validate value exist for each key
 *
 * @param {*} object
 * @return {ValidateObjectExist}
 */
export function validateObjectValueExist(object) {
  const notExistKeys = Object.entries(object).reduce((result, [key, value]) => {
    if (_.isUndefined(value) || _.isNull(value) || value.trim().length === 0) {
      result.push(key)
    }
    return result
  }, [])

  return {
    isAllExist: notExistKeys.length === 0,
    notExistKeys,
  }
}

/**
 * Validate userId exist
 *
 * @param {*} userId
 * @return {boolean}
 */
export function isValidatedUserId(userId) {
  return getNumber(userId) !== 0
}

/**
 * Validate email format
 *
 * @param {string} email
 * @return {boolean}
 */
export function isEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}
