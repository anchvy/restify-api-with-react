import axios from './axios'
import types from '../types/article'

/**
 * action creator:: start fetch
 *
 * @return  {{type: string}}
 */
const fetchStart = () => ({
  type: types.FETCH_LIST,
})

/**
 * action creator:: fetch failure
 *
 * @return  {{type: string}}
 */
const fetchFailure = () => ({
  type: types.FETCH_LIST_FAILURE,
})

/**
 * action creator:: fetch user success
 *
 * @return  {{type: string, payload: *}}
 */
const fetchSuccess = ({ list }) => ({
  type: types.FETCH_LIST_SUCCESS,
  payload: {
    list,
  },
})

// OPERATIONS

/**
 * Fetch article list from network
 */
function fetchArticleList() {
  return async dispatch => {
    dispatch(fetchStart())

    try {
      const { data: list } = await axios.get('/article/list')
      dispatch(fetchSuccess({ list }))
    } catch (error) {
      dispatch(fetchFailure())
    }
  }
}

export default {
  fetchArticleList,
}
