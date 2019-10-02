import CreateGardenForm from '../components/CreateGardenForm'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { selectPlants, selectIsPlantsLoading, addPlant, selectJustAdded } from '../redux/plants';
import { addGardenToUser, AddGardenInput } from '../redux/garden'
import { QtyPlant } from '../types/entities'

const mapState = (state: AppState) => {
    return {
        plants: selectPlants(state),
        loading: selectIsPlantsLoading(state),
        justAdded: selectJustAdded(state)
    }
}

const mapDispatch = (dispatch: any, ownProps: any) => {
    return {
        getPlants: () => dispatch(ownProps.getPlants()),
        addPlant: (plant: QtyPlant) => dispatch(addPlant(plant)),
        addGardenToUser: (garden: AddGardenInput) => dispatch(addGardenToUser(garden))
    }
}

export default connect(mapState, mapDispatch)(CreateGardenForm)