import Garden from '../components/Garden'
import { connect } from 'react-redux'

import { AppState } from '../redux'
import { selectGarden, setGarden } from '../redux/garden'
import { setPlanting } from '../redux/planting'

const mapState = (state: AppState) => {
    return {
        garden: selectGarden(state),
    }
}

const mapDispatch = {
    setGarden,
    setPlanting
}

export default connect(mapState, mapDispatch)(Garden)