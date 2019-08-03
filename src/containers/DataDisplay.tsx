import DataDisplay from '../components/DataDisplay'
import { connect } from 'react-redux'
import { AppState } from '../redux';
import { selectIsAppLoading } from '../redux/ui';

const mapState = (state: AppState) => {
    return {
        dataDisplay: state.ui.dataDisplay,
        loading: selectIsAppLoading(state)
    }
}

export default connect(mapState)(DataDisplay)