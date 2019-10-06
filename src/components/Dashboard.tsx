import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

import GardenCard from '../containers/GardenCard'
import Link from './Link'
import CenterWrapper from './CenterWrapper'
import { withNavBar } from '../containers/NavBar'

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`

const Title = styled.h3`
    padding: 0;
    margin: 0;
`

const GardensContainer = styled.div`
    padding-bottom: 2em;
`

interface Props {
    user?: any
    history: any
}

const Dashboard = ({ user, history }: Props) => {
    if (user === undefined) { return <div/>}

    const renderGardens = () => {
        const { gardens } = user
        const hasGardens = gardens.length > 0

        if (hasGardens) {
            return (
                <GardensContainer>
                    {
                        gardens.map((g: any) => <GardenCard key={g.gardenId} garden={g} />)
                    }
                </GardensContainer>
            )
        } else {
            return (
                <GardensContainer>No gardens</GardensContainer>
            )
        }
    }

    const renderStations = () => { 
        const { gardens } = user
        const gardensWithFavorites = gardens.filter((g: any) => g.station)
        const hasGardens = gardensWithFavorites.length > 0

        if (hasGardens) {
            return (
                gardensWithFavorites.map((g: any) => <h3 key={g.gardenId}>{g.station.name}</h3>)
            )
        } else {
            return (
                <GardensContainer>No stations</GardensContainer>
            )
        }

        
    }
    
    return (
        <CenterWrapper>
            <h2>Welcome {user.firstName}</h2>
            <Row>
                <Title>My Gardens</Title>

                <Link to="/create">
                    <Button primary size={'tiny'}>New Garden</Button>
                </Link>
            </Row>
            {renderGardens()}
            <Row>
                <Title>Favorite Stations</Title>

                <Link to="/location">
                    <Button primary size={'tiny'}>Find Stations</Button>
                </Link>
            </Row>
            {renderStations()}
        </CenterWrapper>
    )
}

export default withNavBar(Dashboard)