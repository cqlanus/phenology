import BulkAddEntry from '../components/BulkAddEntry'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { selectGarden } from '../redux/garden'

const mapState = (state: AppState) => {
    return {
        garden: selectGarden(state)
    }
}

export default connect(mapState)(BulkAddEntry)