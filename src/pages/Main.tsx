import React from 'react'
import styled from 'styled-components'
import Link from '../components/Link'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

const Row = styled.div`
    display: flex;
`

const MainPage = () => {
    return (
        <Container>
            <TextContainer>
                <h2>Phenology</h2>
                <Row>
                    <Link to="/home" >Dashboard</Link>
                    <Link to="/location" >My Location</Link>
                </Row>
            </TextContainer>
        </Container>
    )
}

export default MainPage