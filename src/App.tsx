import React, { useEffect } from 'react';
import styled from 'styled-components'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import configureStore from './redux'
import { getNearbyStations } from './redux/station'

import LocationPage from './pages/Location'
import MainPage from './pages/Main';
import DashboardPage from './pages/Dashboard';

const App: React.FC = () => {
    const store = configureStore()
  useEffect(() => {
    store.dispatch<any>(getNearbyStations())
  }, [store])


  return (
      <Provider store={store} >
          <Router>
            <Route path="/" exact component={MainPage} />
            <Route path="/location" component={LocationPage} />
            <Route path="/home" component={DashboardPage} />
          </Router>
          
      </Provider>
  );
}

export default App;
