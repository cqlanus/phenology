import HistoricalWeather from '../components/HistoricalWeather'
import { connect } from 'react-redux'
import { AppState } from '../redux'
import { selectWeather } from '../redux/weather';
import { Planting } from '../types/user';
const stripYear = (dateStr: string) => dateStr.split('-').slice(1).join('-').split('T').slice(0,1).join('')
const calculateEntries = (plantings: Planting[]) => {
    return plantings.reduce((acc: { [key: string ]: any }, planting, idx): { [key: string ]: any } => {
        const { entries } = planting
        entries.map(e => {
            const existing = acc[stripYear(e.created)]
            acc = {
                ...acc,
                [stripYear(e.created)]: {
                    ...existing,
                    [`${idx+1}`]: {
                        y: (idx + 1) * 3,
                        planting
                    }
                }
            }
        })
        return acc
    }, {})
}

const mapState = (state: AppState, ownProps: any) => {
    const entries: { [key: string]: any } = calculateEntries(ownProps.plantings || [])
    const data = selectWeather(state).map((daily) => {
        const entryForDate = entries[stripYear(daily.date)]
        if (entryForDate) {
            return {
                ...daily,
                entry: entryForDate
            }
        } else {
            return daily
        }
    })
    return {
        ytdWeather: selectWeather(state),
        data,
        numberPlantings: ownProps.plantings && ownProps.plantings.length,
    }
}

export default connect(mapState)(HistoricalWeather)