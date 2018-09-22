import md5 from 'md5'
import db from '../connectors/postgresql'

const TABLE_NAME = 'users'

/**
 *  Create new user row
 *
 * @param {string} email
 * @param {string} username
 * @param {string} alias
 * @param {string} password
 * @return {Promise}
 */
async function create(email, username, alias, password) {
  return db.one(
    `INSERT INTO ${TABLE_NAME}("email", "username", "alias", "password", "createdAt") VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [email, username, alias, md5(password), 'NOW()']
  )
}

/**
 * Query user with given username
 *
 * @param {string} username
 * @return {Promise}
 */
async function getUserByUsername(username) {
  return db.one(`SELECT * FROM ${TABLE_NAME} WHERE "username"='${username}'`)
}

/**
 * Query user with given userId
 *
 * @param {number} userId
 * @return {Promise}
 */
async function getUserById(userId) {
  return db.one(`SELECT * FROM ${TABLE_NAME} WHERE "userId"=${userId}`)
}

export default {
  create,
  getUserByUsername,
  getUserById,
}
