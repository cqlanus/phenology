import Garden from '../components/Garden'
import { connect } from 'react-redux'

import { AppState } from '../redux'
import { selectGarden } from '../redux/garden'

const mapState = (state: AppState, ownProps: any) => {
    const { gardenId } = ownProps.match.params
    return {
        garden: selectGarden(state, { gardenId })
    }
}

export default connect(mapState)(Garden)