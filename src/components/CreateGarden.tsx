import React, { useCallback } from 'react'

import CreateGardenForm from '../containers/CreateGardenForm'
import CenterWrapper from '../components/CenterWrapper'

import { getPlants } from '../redux/plants'

const CreateGarden = () => {

    const memoGetPlants = useCallback(getPlants, [])
    return (
        <CenterWrapper>
            <CreateGardenForm getPlants={memoGetPlants} />
        </CenterWrapper>
    )
}

export default CreateGarden