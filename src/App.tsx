import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Amplify from 'aws-amplify'

import awsconfig from './aws-exports'

import configureStore from './redux'
import { getNearbyStations, getSelectedStation } from './redux/station'
import { getSignedInUser } from './redux/auth'
import { selectGardenId } from './redux/garden'

import LocationPage from './pages/Location'
import MainPage from './pages/Main';
import Garden from './containers/Garden';
import CreateGarden from './containers/CreateGarden';
import Dashboard from './containers/Dashboard';
import StationData from './containers/StationData'
import EntryReview from './containers/EntryReview';

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
            <Route exact path="/garden/:gardenId" render={props => {
                const selectedGarden = selectGardenId(store.getState())
                return selectedGarden ? <Garden {...props} /> : <Redirect to="/home" />
            } } />
            <Route path="/garden/:gardenId/entries" render={props => {
                const selectedGarden = selectGardenId(store.getState())
                return selectedGarden ? <EntryReview {...props} /> : <Redirect to="/home" />
            } } />
            <Route path="/station/:stationId" render={(props: any) => {
                const station = getSelectedStation(store.getState())
                return station ? <StationData {...props} /> : <Redirect to="/location" />
            } } />
          </Router>
          
      </Provider>
  );
}

export default App;
