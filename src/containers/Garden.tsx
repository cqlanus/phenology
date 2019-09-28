import Garden from '../components/Garden'
import { connect } from 'react-redux'

import { AppState } from '../redux'
import { selectGarden, setGarden } from '../redux/garden'

const mapState = (state: AppState) => {
    return {
        garden: selectGarden(state),
    }
}

const mapDispatch = {
    setGarden
}

export default connect(mapState, mapDispatch)(Garden)