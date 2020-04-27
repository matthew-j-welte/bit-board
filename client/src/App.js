import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import lazyLoader from './hoc/lazyLoader'

const HomePage = lazyLoader(() => import('./containers/HomePage/HomePage'))
const LandingPage = lazyLoader(() => import('./containers/LandingPage/LandingPage'))

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LandingPage}/>
      <Route path="/home" exact component={HomePage}/>
    </Switch>
  </BrowserRouter>
)

export default App;
