import AddEntryForm from '../components/AddEntryForm'
import { connect } from 'react-redux'

import { AppState } from '../redux'
import { selectPlanting } from '../redux/planting'
import { addEntryToPlanting } from '../redux/entry'

const mapState = (state: AppState) => {
    return {
        plantingId: selectPlanting(state),
        entry: undefined
    }
}

const mapDispatch = {
    handleSubmitForm: addEntryToPlanting,
    handleRemove: () => {}
}

export default connect(mapState, mapDispatch)(AddEntryForm)