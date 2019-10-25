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
import { Segment, Select, Checkbox } from 'semantic-ui-react'

import { YtdWeather } from '../types/weather'
import { calculateGdd } from '../utils/weather'
import WeatherSettingsModal from './WeatherSettingsModal'

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

const CheckContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

interface LabelProps {
    big?: boolean
}
const StyledLabel = styled.label`
    font-weight: bold;
    font-size: ${(p: LabelProps) => p.big ? '1.1em' : '1em'};
`

const MenuLabel = styled(StyledLabel)`
    display: block;
    margin-bottom: .5em;
`

const Dot = ({ cx, cy, value, numberPlantings }: any) => {
    if (!value) {
        return null
    }
    return (
        <svg x={cx - 5} y={cy - 5}>
            <rect
                height="10"
                width="10"
                fill={interpolateSinebow(value / numberPlantings)}
            />
        </svg>
    )
}

const CustomTooltip = ({ active, payload, label: title, calcYtdGdd, convertToTemp }: any) => {
    if (!active) {
        return null
    }

    const renderContent = () => {
        const data = payload[0]
        if (!data) {
            return null
        }
        const value = data && data.value
        const ytdGdd = data && calcYtdGdd(data)
        const maxTemp = data && convertToTemp('maxTemp')(data.payload)
        const minTemp = data && convertToTemp('minTemp')(data.payload)

        const DATA = [
            { value, text: "GDD" },
            { value: ytdGdd, text: "YTD GDD" },
            { value: maxTemp, text: "MaxTemp" },
            { value: minTemp, text: "MinTemp" },
        ]
        
        return (
            <div>
                {
                    DATA.map(d => (
                        <div key={d.text}>
                            <StyledLabel>{`${d.text}: `}</StyledLabel>
                            {d.value}
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <Segment>
            <StyledLabel big>{title}</StyledLabel>
            {renderContent()}
        </Segment>
    )
}

const INCLUDED_DATA_MAP: { [key: string]: string } = {
    maxTemp: 'Max Temp',
    minTemp: 'Min Temp',
    avgTemp: 'GDD',
}

type InitialIncludedData = {
    maxTemp: boolean
    minTemp: boolean
    avgTemp: boolean
}
const initialIncludedData: InitialIncludedData = {
    maxTemp: true,
    minTemp: true,
    avgTemp: true
}

const HistoricalWeather = ({ ytdWeather, data, numberPlantings }: Props) => {
    const [base, setBase] = useState(40)
    const [includedData, setIncludedData] = useState(initialIncludedData)

    if (ytdWeather.length === 0) {
        return null
    }

    const convertToTemp = (key: string) => (d: any) => d[key] && d[key] >= 0 ? d[key] / 10 : 0
    const calcYtdGdd = (props: any) => {
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
    const handleBase = (base: any) => setBase(base)
    const bases = BASE_VALUES.map(v => ({
        key: v,
        value: v,
        text: `Base ${v}F`
    }))
    const renderButtons = () => {

        return (
            <div>
                <MenuLabel>Base Temperature</MenuLabel>
                <Select fluid onChange={(e, { value }) => handleBase(value)} placeholder="Select base value" options={bases} defaultValue={bases[0].value} />
            </div>
        )
    }

    const handleCheck = (key: keyof InitialIncludedData) => () => {
        const newValue = !includedData[key]
        const newData = {
            ...includedData,
            [key]: newValue
        }
        setIncludedData(newData)
    }

    const renderWeatherChecks = () => {
        return (
            <div>
                <MenuLabel>Select Data to Display</MenuLabel>
                <CheckContainer>
                    {Object.entries(includedData).map((entry: any) => {
                        const [key, checked] = entry
                        const label = INCLUDED_DATA_MAP[key] || ''
                        return <Checkbox checked={checked} onChange={handleCheck(key)} key={key} label={label} />
                    })}
                </CheckContainer>
            </div>
        )
    }

    const getDot = (idx: number) => (dataObject: any) => {
        if (dataObject.entry && dataObject.entry[idx]) {
            return dataObject.entry[idx].y
        }
    }

    return (
        <Container>
            <ResponsiveContainer minWidth="700px" height="90%">
                <ComposedChart data={data}>
                    {
                        includedData.maxTemp && <Line dot={false} dataKey={convertToTemp("maxTemp")} stroke="indianred" />
                    }
                    {
                        includedData.minTemp && <Line dot={false} dataKey={convertToTemp("minTemp")} stroke="steelblue" />
                    }
                    {
                        includedData.avgTemp && <Bar dataKey={calculateGdd(base)} />
                    }
                    <Tooltip
                        content={
                            <CustomTooltip calcYtdGdd={calcYtdGdd} convertToTemp={convertToTemp} />
                        }
                    />
                    {numberPlantings &&
                        Array.from({ length: numberPlantings }).map(
                            (pl, idx) => (
                                <Line
                                    key={idx}
                                    stroke="none"
                                    dataKey={getDot(idx + 1)}
                                    fill={interpolateSinebow(
                                        (idx + 1) / numberPlantings,
                                    )}
                                    dot={
                                        <Dot
                                            numberPlantings={numberPlantings}
                                        />
                                    }
                                />
                            ),
                        )}
                    }
                    <XAxis dataKey={formatDate} />
                    <YAxis />
                </ComposedChart>
            </ResponsiveContainer>
            <WeatherSettingsModal renderWeatherChecks={renderWeatherChecks} renderButtons={renderButtons} />

        </Container>
    )
}

export default HistoricalWeather
