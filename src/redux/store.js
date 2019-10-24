// store是一个对象，通过createStore创建得到
import { createStore } from 'redux'
import {applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'
import { IS_DEV } from '../config'

export default createStore(reducers,
  IS_DEV? composeWithDevTools(applyMiddleware(thunk)):applyMiddleware(thunk))