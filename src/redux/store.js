import thunk from 'redux-thunk'
import {applyMiddleware,createStore} from 'redux' //支持异步编程
import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from './reducers'
import {IS_DEV} from '../config'

export default createStore(reducer,
  IS_DEV?composeWithDevTools(applyMiddleware(thunk)):applyMiddleware(thunk))