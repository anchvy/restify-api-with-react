import jwt from 'jsonwebtoken'
import errors from 'restify-errors'
import md5 from 'md5'
import _ from 'lodash'
import { validateObjectValueExist, isValidatedUserId, isEmail } from '../utils/validate'
import mail from '../services/mail'
import { MAIL_REGISTERATION_HTML, MAIL_REGISTERATION_SUBJECT } from '../configs/mail'
import user from '../models/user'

/**
 * Validate request user and return active userId
 *
 * @param {*} req
 * @return {number}
 */
export function requireRequestUser(req) {
  const { user: { userId } = {} } = req

  if (!isValidatedUserId(userId)) {
    throw new Error(`unauthorized user.`)
  }

  return userId
}

/**
 * Create auth Response
 *
 * @param {number} userId
 * @return {AuthResponse}
 */
function getAuthResponse(userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  })

  const { iat, exp } = jwt.decode(token)
  return { iat, exp, token }
}

/**
 * Controller for route:: /{endpoint}/auth
 * login
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
async function auth(req, res, next) {
  const { username, password } = req.body
  const validateInfo = validateObjectValueExist({ username, password })
  const defaultErrorMsg = `incorrect username or password.`

  try {
    if (!validateInfo.isAllExist) {
      throw new Error()
    }

    const data = await user.getUserByUsername(username)

    // GIVEN PASSWORD === STORED PASSWORD
    if (md5(password) !== data.password) {
      throw new Error()
    }

    res.send(getAuthResponse(data.userId))
  } catch (error) {
    return next(new errors.BadRequestError(defaultErrorMsg))
  }

  return next()
}

/**
 * Send registeration mail to given email
 *
 * @param {string} email
 */
function sendRegisterEmail(email) {
  return mail.send({
    to: email,
    html: MAIL_REGISTERATION_HTML,
    subject: MAIL_REGISTERATION_SUBJECT,
  })
}

/**
 * Controller for route:: /{endpoint}/register
 * create new user
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
async function register(req, res, next) {
  const { email, username, alias, password, rePassword } = req.body
  const validateInfo = validateObjectValueExist({ email, username, alias, password, rePassword })

  try {
    if (!validateInfo.isAllExist) {
      throw new Error(`data not exist. (${validateInfo.notExistKeys})`)
    }
    // VALIDATION RULE: USERNAME LENGTH 5 - 20
    const usernameLength = username.length
    if (usernameLength < 5 || usernameLength > 20) {
      throw new Error(`username must contain 4 - 20 characters.`)
    }
    // VALIDATION RULE: EMAIL FORMAT
    if (!isEmail(email)) {
      throw new Error(`incorrect email format.`)
    }
    // VALIDATION RULE: ALIAS LENGTH 4 - 50
    const aliasLength = alias.length
    if (aliasLength < 4 || aliasLength > 50) {
      throw new Error(`alias must contain 4 - 50 characters.`)
    }
    // VALIDATION RULE: PASSWORD LENGTH 8 - 16
    const passwordLength = password.length
    if (passwordLength < 8 || passwordLength > 16) {
      throw new Error(`password must contain 8 - 16 characters.`)
    }
    // VALIDATION RULE: PASSWORD === RE-PASSWORD
    if (!_.isEqual(password, rePassword)) {
      throw new Error(`password not match.`)
    }

    const data = await user.create(email, username, alias, password)
    sendRegisterEmail(data.email)

    res.send(getAuthResponse(data.userId))
  } catch (error) {
    const { code, message: defaultMessage } = error
    let message = defaultMessage

    // ERROR: DUPLICATE USERNAME
    if (code === '23505') {
      message = `${username} is in used.`
    }

    return next(new errors.BadRequestError(message))
  }

  return next()
}

/**
 * Controller for route:: /{endpoint}/me
 * get user data from request user id
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
async function getData(req, res, next) {
  try {
    const activeUserId = requireRequestUser(req)

    const { userId, email, username, alias } = await user.getUserById(activeUserId)
    res.send({ userId, email, username, alias })
  } catch (error) {
    return next(new errors.UnauthorizedError(`not found user.`))
  }

  res.send(req.params)
  return next()
}

export default {
  auth,
  register,
  getData,
}
