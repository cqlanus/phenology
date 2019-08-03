import React, { useEffect } from 'react';
import styled from 'styled-components'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'

import configureStore from './redux'
import { getNearbyStations } from './redux/station'

import DataDisplay from './containers/DataDisplay'
import StationsList from './containers/StationsList'
import { selectIsAppLoading } from './redux/ui';

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

const Item = styled.div`
  flex: 1;
`

const App: React.FC = () => {
    const store = configureStore()
    const loading = selectIsAppLoading(store.getState())
    console.log({loading})
  useEffect(() => {
    store.dispatch<any>(getNearbyStations())
  }, [store])


  return (
      <Provider store={store} >
        <Container>
            <StationsList />
                <DataDisplay />
        </Container>
      </Provider>
  );
}

export default App;
