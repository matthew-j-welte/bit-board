import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'

import lazyLoader from './hoc/lazyLoader'

const HomePage = lazyLoader(() => import('./containers/HomePage/HomePage'))
const LandingPage = lazyLoader(() => import('./containers/LandingPage/LandingPage'))
const WorkspacePage = lazyLoader(() => import('./containers/WorkspacePage/WorkspacePage'))
const PersonaPage = lazyLoader(() => import('./containers/PersonaPage/PersonaPage'))


const App = () => (
  <BrowserRouter>
    <NavBar/>
    <Switch>
      <Route path="/" exact component={LandingPage}/>
      <Route path="/home" exact component={HomePage}/>
      <Route path="/workspace" exact component={WorkspacePage}/>
      <Route path="/persona" exact component={PersonaPage}/>
    </Switch>
  </BrowserRouter>
)

export default App;
