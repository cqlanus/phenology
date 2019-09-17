import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

import GardenCard from './GardenCard'
import Link from './Link'
import { ApiUser } from '../types/user'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const InnerContainer = styled.div`
    flex-basis: 75%;

    @media (max-width: 700px) {
        flex-basis: 90%;
    }
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`

const GardenTitle = styled.h3`
    padding: 0;
    margin: 0;
`

interface Props {
    user?: ApiUser
}

const Dashboard = ({ user }: Props) => {
    if (!user) { return <div/>}

    const renderGardens = () => {
        const { gardens } = user
        const hasGardens = gardens.length > 0

        if (hasGardens) {
            return (
                <div>
                    {
                        gardens.map((g: any) => <GardenCard key={g.gardenId} garden={g} />)
                    }
                </div>
            )
        } else {
            return (
                <div>No gardens</div>
            )
        }
        
    }
    
    return (
        <Container>
            <InnerContainer>
                <h2>Welcome {user.firstName}</h2>
                <Row>
                    <GardenTitle>My Gardens</GardenTitle>

                    <Link to="/create">
                        <Button primary size={'tiny'}>New Garden</Button>
                    </Link>
                </Row>
                {renderGardens()}
            </InnerContainer>
        </Container>
    )
}

export default Dashboard