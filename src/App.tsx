import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Amplify from 'aws-amplify'

import config from './aws-exports'

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
import SeasonReview from './containers/SeasonReview';
import BulkAddEntry from './containers/BulkAddEntry';

const urlsIn = config.oauth.redirectSignIn.split(",");
const urlsOut = config.oauth.redirectSignOut.split(",");
const oauth = {
  domain: config.oauth.domain,
  scope: config.oauth.scope,
  redirectSignIn: config.oauth.redirectSignIn,
  redirectSignOut: config.oauth.redirectSignOut,
  responseType: config.oauth.responseType
};
const hasLocalhost  = (hostname: string) => Boolean(hostname.match(/localhost/) || hostname.match(/127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/));
const hasHostname   = (hostname: string) => Boolean(hostname.includes(window.location.hostname));
const isLocalhost   = hasLocalhost(window.location.hostname);
if (isLocalhost) {
  urlsIn.forEach((e) =>   { if (hasLocalhost(e)) { oauth.redirectSignIn = e; }});
  urlsOut.forEach((e) =>  { if (hasLocalhost(e)) { oauth.redirectSignOut = e; }});
}
else {
  urlsIn.forEach((e) =>   { if (hasHostname(e)) { oauth.redirectSignIn = e; }});
  urlsOut.forEach((e) =>  { if (hasHostname(e)) { oauth.redirectSignOut = e; }});
}
const configUpdate = config;
configUpdate.oauth = oauth;
Amplify.configure(configUpdate);

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
            <Route path="/garden/:gardenId/season" render={props => {
                const selectedGarden = selectGardenId(store.getState())
                return selectedGarden ? <SeasonReview {...props} /> : <Redirect to="/home" />
            } } />
            <Route path="/garden/:gardenId/bulkadd" render={props => {
                const selectedGarden = selectGardenId(store.getState())
                return selectedGarden ? <BulkAddEntry {...props} /> : <Redirect to="/home" />
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
