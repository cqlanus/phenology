import React, { useState } from 'react'
import styled from 'styled-components'
import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Tooltip,
    XAxis,
    YAxis,
    Line,
} from 'recharts'
import moment from 'moment'
import { interpolateSinebow } from 'd3-scale-chromatic'
import { ButtonGroup, Button } from 'semantic-ui-react'

import { YtdWeather } from '../types/weather'
import { calculateGdd } from '../utils/weather'

interface Props {
    ytdWeather: YtdWeather
    data: any[]
    numberPlantings?: number
}

const Container = styled.div`
    height: 100%;
    padding: 0 0.5em;
    min-height: 30vh;
    overflow: scroll;
`

const Dot = ({cx, cy, value, numberPlantings}: any) => {
    if (!value) { return null }
    return (
    <svg x={cx - 10} y={cy - 10}>
        <rect height="10" width="10" fill={interpolateSinebow(value/numberPlantings)} />
    </svg>
)}

const HistoricalWeather = ({ ytdWeather, data, numberPlantings }: Props) => {
    const [base, setBase] = useState(40)

    if (ytdWeather.length === 0) {
        return null
    }

    const calcYtdGdd = (val: any, name: string, props: any) => {
        const {
            payload: { date },
        } = props
        const index = ytdWeather.findIndex((data: any) => data.date === date)
        const sliced = ytdWeather.slice(0, index).map(calculateGdd(base))
        const reducer = (acc: number, curr: number) => acc + curr
        const reduced = sliced.reduce(reducer, 0)
        return Math.round(reduced)
    }

    const formatDate = (d: any) => {
        return moment(d.date).format('M/D')
    }

    const BASE_VALUES = [40, 45, 50, 55, 60, 65, 70]
    const handleBase = (base: number) => () => setBase(base)
    const renderButtons = () => {
        return (
            <ButtonGroup>
                {BASE_VALUES.map(val => (
                    <Button
                        active={base === val}
                        key={val}
                        onClick={handleBase(val)}>{`Base ${val}F`}</Button>
                ))}
            </ButtonGroup>
        )
    }

    const getDot = (idx: number) => (dataObject: any) => {
        if (dataObject.entry && dataObject.entry[idx]) {
            return dataObject.entry[idx].y
        }
    }

    return (
        <Container>
            {renderButtons()}
            <ResponsiveContainer minWidth="700px" height="90%">
                <ComposedChart data={data}>
                    <Bar dataKey={calculateGdd(base)} />
                    <Tooltip formatter={calcYtdGdd} />
                    {numberPlantings &&
                        Array.from({ length: numberPlantings }).map(
                            (pl, idx) => (
                                <Line
                                    key={idx}
                                    stroke="none"
                                    dataKey={getDot(idx + 1)}
                                    fill={interpolateSinebow((idx + 1)/numberPlantings)}
                                    dot={<Dot numberPlantings={numberPlantings} />}
                                />
                            ),
                        )}}

                    <XAxis dataKey={formatDate} />
                    <YAxis />
                </ComposedChart>
            </ResponsiveContainer>
        </Container>
    )
}

export default HistoricalWeather
