import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const InnerContainer = styled.div`
    flex-basis: 75%;

    @media (max-width: 700px) {
        flex-basis: 90%;
    }
`

const CenterWrapper = ({children}: any) => (
    <Container>
        <InnerContainer>
            { children }
        </InnerContainer>
    </Container>
)

export default CenterWrapper