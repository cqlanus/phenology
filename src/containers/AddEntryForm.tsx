import AddEntryForm from '../components/AddEntryForm'
import { connect } from 'react-redux'

import { AppState } from '../redux'
import { selectPlanting, addEntryToPlanting } from '../redux/planting'

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