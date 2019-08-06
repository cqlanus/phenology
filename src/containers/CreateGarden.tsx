import CreateGarden from '../components/CreateGarden'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { selectPlants, selectIsPlantsLoading, addPlant, QtyPlant, selectJustAdded } from '../redux/plants';

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
        addPlant: (plant: QtyPlant) => dispatch(addPlant(plant))
    }
}

export default connect(mapState, mapDispatch)(CreateGarden)