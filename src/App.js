import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Signout from './pages/Signout';
import ForgetPassword from './pages/ForgetPassword'

import NavBar from './components/NavBar';
import SubMenu from './components/SubMenu';

function App() {
  return (
    <Router>
      <NavBar />
      <SubMenu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/signout">
          <Signout />
        </Route>
        <Route path="/forget">
          <ForgetPassword />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>

      </Switch>
    </Router>
  )
}

export default App;
