import CreateGarden from '../components/CreateGarden'
import { connect } from 'react-redux'
import { AppState } from '../redux';

import { getEntities } from '../redux/entities'

const mapState = (state: AppState) => {
    return {

    }
}

const mapDispatch = {
    getEntities
}

export default connect(mapState, mapDispatch)(CreateGarden)