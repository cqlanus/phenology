import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

import { getClimateNorms } from './hooks/climate'
import { getUserLocation } from './hooks/location'
import { ClimateNorms as ClimateNormsType } from './types/climate'

import ClimateNorms from './components/ClimateNorms'

const Container = styled.div`
    height: 100vh;
`

const App: React.FC = () => {
  const initialNorms: ClimateNormsType = []
  const [ norms, setNorms ] = useState(initialNorms)

  const getData = async () => {
    const stationId = 'GHCND:USW00014819' // ord
    // const stationId = 'GHCND:USW00023174' // lax
    // const stationId = 'GHCND:USW00024234' // seattle
    // const stationId = 'GHCND:USW00012859' // miami
    try {
      getUserLocation()
      const results = await getClimateNorms(stationId)
      setNorms(results)
      
    } catch (error) {
      console.log({ error })
    }

  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <ClimateNorms norms={norms} />
    </Container>
  );
}

export default App;
