import errors from 'restify-errors'
import article from '../models/article'
import { validateObjectValueExist } from '../utils/validate'
import { requireRequestUser } from './user'

/**
 * Controller for route:: /{endpoint}/article/create
 * create new article
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
async function create(req, res, next) {
  try {
    const userId = requireRequestUser(req)
    const { title, content, imageUrl } = req.body
    // VALIDATION RULE: REQUIRE DATA EXIST
    const validateInfo = validateObjectValueExist({ title, content })
    if (!validateInfo.isAllExist) {
      throw new Error(`data not exist. (${validateInfo.notExistKeys})`)
    }

    const data = await article.create(title, content, imageUrl, userId)
    res.send(data)
  } catch (error) {
    return next(new errors.BadRequestError(error.message))
  }

  return next()
}

/**
 * Controller for route:: /{endpoint}/article/list
 * get article list
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {Array}
 */
async function getList(req, res, next) {
  try {
    const {
      query: { limit = 20 },
    } = req

    const data = await article.getList(limit)
    res.send(data)
  } catch (error) {
    return next(new errors.BadRequestError(error.message))
  }

  return next()
}

export default {
  create,
  getList,
}
