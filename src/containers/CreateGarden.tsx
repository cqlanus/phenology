import CreateGarden from '../components/CreateGarden'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { selectPlants, selectIsPlantsLoading } from '../redux/plants';

const mapState = (state: AppState) => {
    return {
        plants: selectPlants(state),
        loading: selectIsPlantsLoading(state)
    }
}

const mapDispatch = (dispatch: any, ownProps: any) => {
    return {
        getPlants: () => dispatch(ownProps.getPlants())
    }
}

export default connect(mapState, mapDispatch)(CreateGarden)