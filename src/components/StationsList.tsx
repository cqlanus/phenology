import React from 'react'
import styled from 'styled-components'

import { getClimateNorms, getNearbyStations } from '../hooks/climate'
import { Station, ClimateNorms } from '../types/climate'
import { County } from '../types/location';

const Container = styled.div`
    padding: 0.5em;
    
`

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const StationCard: any = styled.div`
    flex-basis: 15vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
    padding: .5em;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    border-radius: 0.5em;
    font-size: 0.8em;
    cursor: pointer;
    background: ${(p: any) => p['data-selected'] && 'whitesmoke'};
    
    :hover {
        box-shadow: 1px 1px 1px rgba(0,0,0,0.3);
    }

    :last-child {
        margin-right: 0;
    }
`

const Text = styled.span`
`

const ListTitle = styled.div`

`

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ItemTitle = styled.span`
    font-weight: bold;
`

interface Props {
    stations: Station[]
    setNorms: (norms: ClimateNorms) => void
    selectStation: (stationId: string) => void
    selectedStation: string | undefined
    county: County | undefined
}

interface ItemProps {
    title: string,
    value: string
}

const StationItem = ({ title, value}: ItemProps) => (
    <ItemContainer>
        <ItemTitle>{`${title}:`}</ItemTitle>
        <Text>{value}</Text>
    </ItemContainer>
)

const StationsList = ({ 
    stations, 
    setNorms, 
    selectStation, 
    selectedStation, 
    county }: Props) => {

    const handleClick = (id: string) => async () => {
        selectStation(id)
        const norms = await getClimateNorms(id)
        setNorms(norms)
    }
    
    return (
        <Container>
            { county && <ListTitle>{`${county.name} County Stations`}</ListTitle>}
            <List>
                {
                    stations.map(s => (
                        <StationCard 
                            key={s.id} 
                            data-selected={s.id === selectedStation}
                            onClick={handleClick(s.id)} >
                            <StationItem value={s.name} title={'Station'}/>
                            <StationItem value={s.id} title={'ID'}/>
                        </StationCard>
                    ))
                }
            </List>
        </Container>
    )
}

export default StationsList