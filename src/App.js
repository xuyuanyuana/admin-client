import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'

import Login from './containers/login/login'
import Admin from './containers/admin/admin'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} exact/>
          <Route path='/' component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;