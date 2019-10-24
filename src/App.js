import React, { Component } from 'react';
import {Router,Route,Switch} from 'react-router-dom'

import Login from './containers/login/login'
import Admin from './containers/admin/admin'
import history from './history'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/login' component={Login} exact/>
          <Route path='/' component={Admin} />
        </Switch>
      </Router>
    );
  }
}

export default App;