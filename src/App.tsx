import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import 'semantic-ui-css/semantic.min.css'
import { Loader } from 'semantic-ui-react'

import { getNearbyStations, getClimateNorms, getHistoricalWeather } from './hooks/climate'
import { getCountyCode } from './hooks/location'
import { ClimateNorms as ClimateNormsType, Station } from './types/climate'
import { County } from './types/location'

import ClimateNorms from './components/ClimateNorms'
import HistoricalWeather from './components/HistoricalWeather'
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
  const [ ytdWeather, setWeather ] = useState(initialNorms)
  const [ county, setCounty ] = useState(initialCounty)
  const [ stations, setStations ] = useState(initialStations)
  const [ selectedStation, selectStation ] = useState(initialStation)
  const [ loading, setLoading ] = useState(false)

  const getData = async () => {
    try {
        setLoading(true)
      const countyData = await getCountyCode()
      setCounty(countyData)

      if (countyData) {
        const nearbyStations = await getNearbyStations(countyData.countyId)
        setStations(nearbyStations)
      }
    } catch (error) {
      console.log({ error })
    }
    setLoading(false)
  }
  
  useEffect(() => {
    getData()
  }, [])

  const handleNorms = async () => {
    setLoading(true)
    if (selectedStation) {
        const norms = await getClimateNorms(selectedStation)
        setNorms(norms)
    }
    setLoading(false)
}

const handleYtdWeather = async () => {
    setLoading(true)
    if (selectedStation) {
        const ytd = await getHistoricalWeather(selectedStation)
        console.log({ytd})
        setWeather(ytd)
    }
    setLoading(false)
}

  return (
    <Container>
        <StationsList 
          stations={stations} 
          county={county}
          selectedStation={selectedStation}
          selectStation={selectStation}
          handleYtdWeather={handleYtdWeather}
          handleNorms={handleNorms} />
        <Item>
          {
            norms.length > 0 && <ClimateNorms norms={norms} />
          }
          {
            ytdWeather.length > 0 && <HistoricalWeather ytdWeather={ytdWeather} />
          }
        </Item>
        { <Loader active={loading}/> }
    </Container>
  );
}

export default App;
