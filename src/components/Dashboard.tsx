import React from 'react'
import styled from 'styled-components'

import GardenCard from './GardenCard'
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

const GardenRow = styled.div`
    display: flex;
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
                <GardenRow>
                    {
                        gardens.map((g: any) => <GardenCard key={g.gardenId} garden={g} />)
                    }
                </GardenRow>
            )
        } else {
            return (
                <GardenRow>No gardens</GardenRow>
            )
        }
        
    }
    
    return (
        <Container>
            <InnerContainer>
                <h2>Welcome {user.firstName}</h2>
                {renderGardens()}
            </InnerContainer>
        </Container>
    )
}

export default Dashboard