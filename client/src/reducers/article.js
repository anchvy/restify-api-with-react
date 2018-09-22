import types from '../types/article'

const initialState = {
  isLoading: false,
  list: {},
}

export default function article(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_LIST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case types.FETCH_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        list: {
          ...state.list,
          ...action.payload.list,
        },
      }
    }

    case types.FETCH_LIST_FAILURE: {
      return {
        ...state,
        isLoading: false,
      }
    }

    default: {
      return state
    }
  }
}
