import AddEntryForm from '../components/AddEntryForm'
import { connect } from 'react-redux'

import { AppState } from '../redux'
import { selectPlanting, editEntry } from '../redux/planting'
import { selectEntry } from '../redux/entry'

const mapState = (state: AppState) => {
    return {
        plantingId: selectPlanting(state),
        entry: selectEntry(state)
    }
}

const mapDispatch = {
    handleSubmitForm: editEntry
}

export default connect(mapState, mapDispatch)(AddEntryForm)