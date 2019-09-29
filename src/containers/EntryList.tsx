import EntryList from '../components/EntryList'
import { connect } from 'react-redux'
import { AppState } from '../redux'

const mapState = (state: AppState) => {
    return {
        phenophases: state.phenophase
    }
}

export default connect(mapState)(EntryList)