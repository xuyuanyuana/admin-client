import React, { Component } from 'react';
import {HashRouter,Switch,Route} from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends Component {
    render() {
      return (
        <HashRouter>
          <Switch>
            {/* Switch特点：；路由是模糊匹配的，匹配第一个 */}
            <Route path='/login' component={Login}/>
            <Route path='/' component={Admin}/>
          </Switch>
        </HashRouter>
      );
    }
  }

