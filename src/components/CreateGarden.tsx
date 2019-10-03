import React, { useCallback } from 'react'

import CreateGardenForm from '../containers/CreateGardenForm'
import CenterWrapper from '../components/CenterWrapper'
import NavBar from '../components/NavBar'

import { getPlants } from '../redux/plants'

const CreateGarden = () => {

    const memoGetPlants = useCallback(getPlants, [])
    return (
        <div>
            <NavBar/>
            <CenterWrapper>
                <CreateGardenForm getPlants={memoGetPlants} />
            </CenterWrapper>
        </div>
    )
}

export default CreateGarden