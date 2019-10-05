import React, { useState } from 'react'
import styled from 'styled-components'
import { ResponsiveContainer, ComposedChart, Bar, Tooltip, XAxis, YAxis } from 'recharts'
import { format } from 'date-fns'
import { ButtonGroup, Button } from 'semantic-ui-react'

import { YtdWeather } from '../types/weather'

interface Props {
    ytdWeather: YtdWeather
}

const Container = styled.div`
    height: 100%;
    padding: 0 0.5em;
    min-height: 30vh;
    overflow: scroll;
`

const HistoricalWeather = ({ ytdWeather}: Props) => {
    const [ base, setBase ] = useState(40)
    
    if (ytdWeather.length === 0) { return <div/> }
    

    const fToC = (f: number) => (f - 32) / (1.8)

    const calculateGdd = (baseTemp: number = base) => (d: any) => {
        const { value } = d.avgTemp
        const convertedTemp = fToC(baseTemp)
        const decimalValue = value / 10
        return decimalValue > convertedTemp
            ? decimalValue - convertedTemp
            : 0
    }

    const calcYtdGdd = (val: any, name: string, props: any) => {
        const { payload: { avgTemp: { date }} } = props
        const index = ytdWeather.findIndex((data: any) => data.avgTemp.date === date)
        const sliced = ytdWeather.slice(0, index).map(calculateGdd(base))
        const reducer = (acc: number, curr: number) => acc + curr
        const reduced = sliced.reduce(reducer, 0)
        return Math.round(reduced)
    }
    
    const formatDate = (d: any) => format(d.avgTemp.date, "M/D")

    const BASE_VALUES = [ 40, 45, 50, 55, 60, 65, 70 ]
    const handleBase = (base: number) => () => setBase(base)
    const renderButtons = () => {
        return (
            <ButtonGroup>
                {
                    BASE_VALUES.map(val => <Button active={base === val} key={val} onClick={handleBase(val)} >{`Base ${val}F`}</Button>)
                }
            </ButtonGroup>
        )
    }
    
    return (
        <Container>
            { renderButtons() }
            <ResponsiveContainer minWidth="700px" height="60%">
                <ComposedChart data={ytdWeather} >
                    <Bar dataKey={calculateGdd(base)} />
                    <Tooltip formatter={calcYtdGdd} />
                    <XAxis dataKey={formatDate} />
                    <YAxis/>
                </ComposedChart>
            </ResponsiveContainer>
        </Container>
    )
}

export default HistoricalWeather