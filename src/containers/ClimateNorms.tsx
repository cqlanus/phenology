import ClimateNorms from '../components/ClimateNorms'
import { connect } from 'react-redux'
import { AppState } from '../redux';
import { selectNorms } from '../redux/climate';

const mapState = (state: AppState) => {
    return {
        norms: selectNorms(state)
    }
}

export default connect(mapState)(ClimateNorms)