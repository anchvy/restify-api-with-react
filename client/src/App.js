import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Login from './containers/Login'
import Register from './containers/Register'
import HomePage from './containers/HomePage'
import paths from './configs/paths'
import store from './store'

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path={paths.homepage} component={HomePage} />
        <Route path={paths.login} component={Login} />
        <Route path={paths.register} component={Register} />
        <Route component={HomePage} />
      </Switch>
    </Router>
  </Provider>
)

export default App
