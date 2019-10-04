import AddPlantForm from '../components/AddPlantForm'
import { connect } from 'react-redux'

import { AppState } from '../redux'
import { selectPlants } from '../redux/plants'
import { addPlantings } from '../redux/planting'

const mapState = (state: AppState, ownProps: any) => {
    return {
        plants: selectPlants(state),
        closeModal: ownProps.closeModal,
    }
}

const mapDispatch = {
    addPlantings
}

export default connect(mapState, mapDispatch)(AddPlantForm)