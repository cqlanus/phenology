import AddEntryForm from '../components/AddEntryForm'
import { connect } from 'react-redux'

import { AppState } from '../redux'
import { selectPlanting } from '../redux/planting'
import { selectEntry, removeEntry, editEntry } from '../redux/entry'

const mapState = (state: AppState) => {
    return {
        plantingId: selectPlanting(state),
        entry: selectEntry(state)
    }
}

const mapDispatch = {
    handleSubmitForm: editEntry,
    handleRemove: removeEntry
}

export default connect(mapState, mapDispatch)(AddEntryForm)