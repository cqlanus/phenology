import EntryList from '../components/EntryList'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { setEntry } from '../redux/entry'
import { setPlanting } from '../redux/planting'

const mapState = (state: AppState, ownProps: any) => {
    return {
        phenophases: state.phenophase,
        plantingId: ownProps.plantingId
    }
}

const mapDispatch = {
    setEntry,
    setPlanting
}

export default connect(mapState, mapDispatch)(EntryList)