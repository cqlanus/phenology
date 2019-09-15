import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 1em;
    flex-basis: 200px;
`

interface Props {
    children: any
}

const Card = ({children}: Props) => (
    <Container>
        {children}
    </Container>
)

export default Card