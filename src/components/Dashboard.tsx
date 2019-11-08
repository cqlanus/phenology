import React from 'react'
import styled from 'styled-components'
import { Button, Card, Image } from 'semantic-ui-react'
import { Link as L, withRouter, RouteComponentProps } from 'react-router-dom'

import GardenCard from '../containers/GardenCard'
import Link from './Link'
import CenterWrapper from './CenterWrapper'
import { Station } from '../types/climate'
import { Garden } from '../types/user'
import { BREAKPOINTS } from '../data/breakpoints'
import { StyledHeader } from './StyledHeader'
import stationImg from '../assets/images/wind-power.svg'

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
const StyledCard = styled(Card)`
    &&& {
        padding: 1em;
    }
`

const StyledLink = styled(L)`
    &&&& > ${StyledCard} {
        margin-bottom: .75em;
    }
`

interface Section {
    name: string
}
const Section = styled.div`
    grid-area: ${({ name }: Section) => name};
`

const Layout = styled.div`
    display: grid;
    grid-template-areas: 
        "garden"
        "station";

    @media (min-width: ${BREAKPOINTS.TABLET}px) {    
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1em;
        grid-template-areas: 
            "garden station";
    }
    
`
const Content = styled.div`
    display: flex;
    align-items: center;
`

const ImageContainer = styled.div`
    height: 3.2em;
    width: 3.2em;
    margin-right: 1em;
    float: left;
`

interface StationProps {
    station?: Station,
    selectStation: (id: string) => void
}
const StationCard = withRouter(({ station, selectStation, history }: StationProps & RouteComponentProps) => {
    if (station) {
        const name = station.name.split(',')[0]
        const handleClick = () => {
            selectStation(station.stationId)
            // history.push(`/station/${station.stationId}`)
        }
        return (
            <StyledLink to={`/station/${station.stationId}`} onClick={handleClick}>
                <StyledCard fluid >
                    <Content>
                        <Card.Content>
                            <ImageContainer>
                                <Image src={stationImg} size="tiny" />
                            </ImageContainer>
                        </Card.Content>
                        <Card.Content>

                            <StyledHeader>{name}</StyledHeader>
                            <Card.Meta>{station.stationId}</Card.Meta>
                        </Card.Content>
                    </Content>
                </StyledCard>
            </StyledLink>
        )
    } else {
        return null
    }
})

interface Props {
    user?: any,
    selectStation: (id: string) => void
}

const Dashboard = ({ user, selectStation }: Props) => {

    if (user === undefined) {
        return null
    }

    const renderGardens = () => {
        const { gardens } = user
        const hasGardens = gardens.length > 0

        if (hasGardens) {
            return (
                <GardensContainer>
                    {gardens.map((g: any) => (
                        <GardenCard key={g.gardenId} garden={g} />
                    ))}
                </GardensContainer>
            )
        } else {
            return <GardensContainer>No gardens</GardensContainer>
        }
    }

    const renderStations = () => {
        const { gardens } = user
        const gardensWithFavorites: Garden[] = gardens.filter((g: Garden) => g.station)
        const hasGardens = gardensWithFavorites.length > 0

        if (hasGardens) {
            const uniqueStationMap: { [key: string]: Station } = gardensWithFavorites.reduce((acc, garden) => {
                return garden.station ? {
                    ...acc,
                    [garden.station.stationId]: garden.station
                } : acc
            }, {})

            return Object.values(uniqueStationMap).map(
                (station: Station) =>
                    station && (
                        <StationCard
                            key={station.stationId}
                            station={station}
                            selectStation={selectStation}
                        />
                    ),
            )
        } else {
            return <GardensContainer>No stations</GardensContainer>
        }
    }

    return (
        <CenterWrapper>
            <h2>Welcome {user.firstName}</h2>
            <Layout>
                <Section name="garden" >
                    <Row>
                        <Title>My Gardens</Title>

                        <Link to="/create">
                            <Button primary size={'tiny'}>
                                New Garden
                            </Button>
                        </Link>
                    </Row>
                    {renderGardens()}
                </Section>
                <Section name="station">
                    <Row>
                        <Title>Favorite Stations</Title>

                        <Link to="/location">
                            <Button primary size={'tiny'}>
                                Find Stations
                            </Button>
                        </Link>
                    </Row>
                    {renderStations()}
                </Section>
            </Layout>

            {/* <Row>
                <Button onClick={() => api.addPlants(plants)} >Add Plants</Button>
            </Row> */}

        </CenterWrapper>
    )
}

export default Dashboard
