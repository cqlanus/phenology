import EntryReview from '../components/EntryReview'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { selectGarden } from '../redux/garden'

const mapState = (state: AppState) => {
    const garden = selectGarden(state)
    return {
        plantings: garden ? garden.plantings : []
    }
}

export default connect(mapState)(EntryReview)