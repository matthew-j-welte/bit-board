import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'

import ErrorBoundary from './hoc/ErrorBoundary'
import HomePage from'./containers/HomePage/HomePage'
import LandingPage from'./containers/LandingPage/LandingPage'
import WorkspacePage from'./containers/WorkspacePage/WorkspacePage'
import PersonaPage from'./containers/PersonaPage/PersonaPage'
import LearnPage from'./containers/LearnPage/LearnPage'
import CodePage from'./containers/CodePage/CodePage'


const App = () => (
  <BrowserRouter>
    <NavBar/>
    <Switch>
      <Route path="/" exact component={() => <ErrorBoundary><LandingPage/></ErrorBoundary>}/>
      <Route path="/home" exact component={() => <ErrorBoundary><HomePage/></ErrorBoundary>}/>
      <Route path="/workspace" exact component={() => <ErrorBoundary><WorkspacePage/></ErrorBoundary>}/>
      <Route path="/persona" exact component={() => <ErrorBoundary><PersonaPage/></ErrorBoundary>}/>
      <Route path="/learn" exact component={() => <ErrorBoundary><LearnPage/></ErrorBoundary>}/>
      <Route path="/code" exact component={() => <ErrorBoundary><CodePage/></ErrorBoundary>}/>
    </Switch>
  </BrowserRouter>
)

export default App;
