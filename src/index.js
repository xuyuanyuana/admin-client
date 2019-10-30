import React,{Suspense} from 'react'
import ReactDOM from 'react-dom' 
import { Provider } from 'react-redux'
import './config/i18n.js'

import App from './App'
import store from './redux/store'
// 渲染虚拟dom
ReactDOM.render(
  (
    <Suspense fallback={<div>loading...</div>}>
      <Provider store={store}>
          <App/>  
      </Provider>
    </Suspense>
  )
  ,document.querySelector('#root'))