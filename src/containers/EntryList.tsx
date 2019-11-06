import EntryList from '../components/EntryList'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { setEntry, selectOrderedEntries } from '../redux/entry'
import { setPlanting } from '../redux/planting'

const mapState = (state: AppState, ownProps: any) => {
    return {
        entries: selectOrderedEntries(state, ownProps),
        phenophases: state.phenophase,
        planting: ownProps.planting,
    }
}
 
const mapDispatch = {
    setEntry,
    setPlanting
}

export default connect(mapState, mapDispatch)(EntryList)