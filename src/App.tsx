import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

import { getClimateNorms, getNearbyStations } from './hooks/climate'
import { getCountyCode } from './hooks/location'
import { ClimateNorms as ClimateNormsType, Station } from './types/climate'
import { County } from './types/location'

import ClimateNorms from './components/ClimateNorms'
import StationsList from './components/StationsList'

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
  const initialNorms: ClimateNormsType = []
  let initialCounty: County | undefined
  const initialStations: Station[] = []
  let initialStation: string | undefined
  const [ norms, setNorms ] = useState(initialNorms)
  const [ county, setCounty ] = useState(initialCounty)
  const [ stations, setStations ] = useState(initialStations)
  const [ selectedStation, selectStation ] = useState(initialStation)

  const getData = async () => {
    // const stationId = 'GHCND:USW00014819' // ord
    // // const stationId = 'GHCND:USW00023174' // lax
    // // const stationId = 'GHCND:USW00024234' // seattle
    // // const stationId = 'GHCND:USW00012859' // miami
    try {
      const countyData = await getCountyCode()
      setCounty(countyData)

      if (countyData) {
        const nearbyStations = await getNearbyStations(countyData.countyId)
        setStations(nearbyStations)
      }
    } catch (error) {
      console.log({ error })
    }

  }
console.log({county})
  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
        <StationsList 
          stations={stations} 
          county={county}
          selectedStation={selectedStation}
          selectStation={selectStation}
          setNorms={setNorms} />
        <Item>
          {
            norms.length > 0 && <ClimateNorms norms={norms} />
          }
        </Item>
    </Container>
  );
}

export default App;
