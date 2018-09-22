import db from '../connectors/postgresql'
import { capNumber } from '../utils/number'

const TABLE_NAME = 'articles'

/**
 * Create new article row
 *
 * @param {string} title
 * @param {string} content
 * @param {string} imageUrl
 * @param {number} userId
 * @return {Promise}
 */
function create(title, content, imageUrl, userId) {
  return db.one(
    `INSERT INTO ${TABLE_NAME}("title", "content", "imageUrl", "createdAt", "userId") VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [title, content, imageUrl, 'NOW()', userId]
  )
}

/**
 * Query article list with given limit
 *
 * @param {number} limit
 * @return {Promise}
 */
function getList(limit) {
  return db.any(
    `SELECT * FROM ${TABLE_NAME} ORDER BY "articleId" LIMIT ${capNumber(limit, 1, 100)} OFFSET 0`
  )
}

export default {
  create,
  getList,
}
