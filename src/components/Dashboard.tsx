import React, { useEffect } from 'react'
import styled from 'styled-components'
import { addUser, getUser } from '../redux/entities';

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

interface Props {
    getEntities: () => void
}

const Dashboard = ({ getEntities }: Props) => {

    useEffect(() => {
        getEntities()
    }, [getEntities]) 

    return (
        <Container>
            <InnerContainer>
                <h2>Welcome Chris</h2>
                <button onClick={() => addUser()} >Add User</button>
                <button onClick={() => getUser('cqlanus')} >Get User</button>
            </InnerContainer>
        </Container>
    )
}

export default Dashboard