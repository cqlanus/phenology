import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

import GardenCard from '../containers/GardenCard'
import Link from './Link'
import CenterWrapper from './CenterWrapper'
// import { ApiUser } from '../types/user'

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
        <CenterWrapper>
            <h2>Welcome {user.firstName}</h2>
            <Row>
                <GardenTitle>My Gardens</GardenTitle>

                <Link to="/create">
                    <Button primary size={'tiny'}>New Garden</Button>
                </Link>
            </Row>
            {renderGardens()}
        </CenterWrapper>
    )
}

export default Dashboard