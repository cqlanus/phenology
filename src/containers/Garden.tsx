import Garden from '../components/Garden'
import { connect } from 'react-redux'

import { AppState } from '../redux'
import { selectGarden, setGarden, removeGarden } from '../redux/garden'
import { setPlanting, removePlanting } from '../redux/planting'

const mapState = (state: AppState) => {
    return {
        garden: selectGarden(state),
    }
}

const mapDispatch = {
    setGarden,
    setPlanting,
    removeGarden,
    removePlanting
}

export default connect(mapState, mapDispatch)(Garden)