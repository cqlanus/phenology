import React from 'react'
import styled from 'styled-components'
import { addUser } from '../redux/entities';
import { User } from '../types/entities'

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
    getEntities: () => void,
    user?: User
}

const Dashboard = ({ getEntities, user }: Props) => {

    console.log({user})

    return (
        <Container>
            <InnerContainer>
                <h2>Welcome Chris</h2>
                <button onClick={() => addUser()} >Add User</button>
            </InnerContainer>
        </Container>
    )
}

export default Dashboard