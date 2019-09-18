import GardenCard from '../components/GardenCard'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { AppState } from '../redux'

import { setGarden } from '../redux/garden'

const mapState = (state: AppState, { garden, history }: any) => {
    return {
        garden,
        history
    }
}

const mapDispatch = {
    setGarden
}

export default withRouter(
    connect(mapState, mapDispatch)(GardenCard)
)