import BulkAddEntry from '../components/BulkAddEntry'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { selectGarden } from '../redux/garden'
import { bulkAddEntry } from '../redux/entry'

const mapState = (state: AppState) => {
    return {
        garden: selectGarden(state)
    }
}


const mapDispatch = {
    bulkAddEntry
}

export default connect(mapState, mapDispatch)(BulkAddEntry)