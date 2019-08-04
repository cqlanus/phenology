import React from 'react'
import styled from 'styled-components'

import CreateGarden from '../components/CreateGarden'
import { PopLink } from '../components/Link'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FormContainer = styled.div`
    flex-basis: 50%;
`

const DashboardPage = () => {

    return (
        <Container>
            <FormContainer>
                <PopLink />
                <CreateGarden/>
            </FormContainer>
        </Container>
    )
}

export default DashboardPage