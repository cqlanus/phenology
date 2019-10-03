import AddPlantForm from '../components/AddPlantForm'
import { connect } from 'react-redux'

import { AppState } from '../redux'
import { selectPlants } from '../redux/plants'
import { addPlantings } from '../redux/planting'

const mapState = (state: AppState) => {
    return {
        plants: selectPlants(state)
    }
}

const mapDispatch = {
    addPlantings
}

export default connect(mapState, mapDispatch)(AddPlantForm)