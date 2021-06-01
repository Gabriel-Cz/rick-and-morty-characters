import React from 'react'
import AppHeader from './components/AppHeader/AppHeader';
import Home from '../src/views/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Store from '../src/store'
import styles from './App.scss';
import CharactersGrid from './components/CharactersGrid/CharactersGrid';
import Character from './views/Character';
import RouterComponent, { routes } from './router/RouterComponent';
import RouteWithSubRoutes from './router/RouteWithSubRoutes';

function App() {
  return (
    <Store>
        <Router>
          <div className={styles.App}>
            <AppHeader />
             <div id="contentContainer" style={{display: 'flex', justifyContent: 'center', position: "relative"}}>
                <Switch>
                  <Route path="/">
                    <Home/>
                  </Route>
                </Switch>
              </div>
          </div>
        </Router>
    </Store>
  );
}

export default App;