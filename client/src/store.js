import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers'
import { isEnvProduction } from './utils/environment'

const debug = !isEnvProduction()

const middleware = applyMiddleware(thunk)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const composeMiddleWare = composeEnhancers(middleware)

export default (debug ? createStore(reducer, composeMiddleWare) : createStore(reducer, middleware))
