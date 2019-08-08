import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'

import CreateGardenForm from '../containers/CreateGardenForm'
import { PopLink } from '../components/Link'

import { getPlants } from '../redux/plants'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FormContainer = styled.div`
    flex-basis: 55%;

    @media (max-width: 700px) {
        flex-basis: 90%;
    }
`

interface Props {
    getEntities: () => void
}

const CreateGarden = ({ getEntities }: Props) => {

    useEffect(() => {
        getEntities()
    }, []) 

    const memoGetPlants = useCallback(getPlants, [])
    return (
        <Container>
            <FormContainer>
                <PopLink />
                <CreateGardenForm getPlants={memoGetPlants} />
            </FormContainer>
        </Container>
    )
}

export default CreateGarden