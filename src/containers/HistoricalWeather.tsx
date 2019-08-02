import HistoricalWeather from '../components/HistoricalWeather'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { selectWeather } from '../redux/weather';

const mapState = (state: AppState) => {
    return {
        ytdWeather: selectWeather(state)
    }
}

export default connect(mapState)(HistoricalWeather)