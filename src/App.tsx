import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import 'semantic-ui-css/semantic.min.css'
import { Loader } from 'semantic-ui-react'
import { Provider } from 'react-redux'

import configureStore from './redux'
import { getNearbyStations } from './redux/station'

// import { getNearbyStations, getClimateNorms, getHistoricalWeather } from './hooks/climate'
// import { getCountyCode } from './hooks/location'
import { ClimateNorms as ClimateNormsType, Station } from './types/climate'
import { County } from './types/location'

import ClimateNorms from './containers/ClimateNorms'
import HistoricalWeather from './containers/HistoricalWeather'
import StationsList from './containers/StationsList'
import { YtdWeather } from './types/weather';
import { selectIsAppLoading } from './redux/app';

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
//   const initialNorms: ClimateNormsType = []
//   const initialYtdWeather: YtdWeather = []
//   let initialCounty: County | undefined
//   const initialStations: Station[] = []
//   let initialStation: string | undefined
//   const [ norms, setNorms ] = useState(initialNorms)
//   const [ ytdWeather, setWeather ] = useState(initialYtdWeather)
//   const [ county, setCounty ] = useState(initialCounty)
//   const [ stations, setStations ] = useState(initialStations)
//   const [ selectedStation, selectStation ] = useState(initialStation)
//   const [ loading, setLoading ] = useState(false)

//   const getData = async () => {
//     try {
//         setLoading(true)
//       const countyData = await getCountyCode()
//       setCounty(countyData)

//       if (countyData) {
//         const nearbyStations = await getNearbyStations(countyData.countyId)
//         setStations(nearbyStations)
//       }
//     } catch (error) {
//       console.log({ error })
//     }
//     setLoading(false)
//   }
  
    const store = configureStore()
    const loading = selectIsAppLoading(store.getState())
  useEffect(() => {
    store.dispatch<any>(getNearbyStations())
  }, [])


  return (
      <Provider store={store} >
        <Container>
            <StationsList />
            <Item>
                <ClimateNorms />
                <HistoricalWeather/>
            </Item>
            { <Loader active={loading}/> }
        </Container>
      </Provider>
  );
}

export default App;
