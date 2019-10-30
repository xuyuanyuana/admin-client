import React, { Component } from 'react';
import {Router,Route,Switch} from 'react-router-dom'

import Login from './containers/login'
import Admin from './containers/admin'
import history from './history'
import routes from './config/route'

class App extends Component {
  render() {
    return (
      <Router history={history}>
      
        <Switch>
          <Route path='/login' component={Login} exact/>
          <Admin>
            <Switch>
              {
                routes.map(item => <Route {...item} key={item.path}/>)
              }
            </Switch>
          </Admin>  
        </Switch>
      </Router>
    );
  }
}

export default App;