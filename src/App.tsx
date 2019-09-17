import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Amplify from 'aws-amplify'

import awsconfig from './aws-exports'

import configureStore from './redux'
import { getNearbyStations } from './redux/station'
import { getSignedInUser } from './redux/auth'

import LocationPage from './pages/Location'
import MainPage from './pages/Main';
import Garden from './containers/Garden';
import CreateGarden from './containers/CreateGarden';
import Dashboard from './containers/Dashboard';

Amplify.configure(awsconfig)

const App: React.FC = () => {
    const store = configureStore()
  useEffect(() => {
    store.dispatch<any>(getNearbyStations())
    store.dispatch<any>(getSignedInUser())
  }, [store])


  return (
      <Provider store={store} >
          <Router>
            <Route path="/" exact component={MainPage} />
            <Route path="/location" component={LocationPage} />
            <Route path="/home" component={Dashboard} />
            <Route path="/create" component={CreateGarden} />
            <Route path="/garden/:gardenId" component={Garden} />
          </Router>
          
      </Provider>
  );
}

export default App;
