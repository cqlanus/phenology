import React from 'react'
import styled from 'styled-components'
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis } from 'recharts'
import { format } from 'date-fns'

import { ClimateNorms as ClimateNormsType } from '../types/climate'

interface Props {
    norms: ClimateNormsType
}

const Container = styled.div`
    height: 100%;
    padding: 0 0.5em;
    min-height: 30vh;
`

const ClimateNorms = ({ norms }: Props) => {
    if (!norms || norms.length === 0) { return <div/> }
    const convertToTemp = (key: string) => (d: any) => d[key].value / 10

    const convertGdd = (key: string) => (d: any) => d[key].value > 0 ? d[key].value : 0
    const convertPrecip = (key: string) => (d: any) => d[key].value > 0 ? d[key].value / 10 : 0
    const formatDate = (d: any) => format(d.dailyMaxTemp.date, "M/D")
    
    return (
        <Container>
            <ResponsiveContainer height={"100%"}>
                <ComposedChart data={norms}>
                <Line
                    dot={false}
                    connectNulls
                    dataKey={convertToTemp('dailyMaxTemp')}
                    stroke={'indianred'}
                    strokeWidth={2}
                    name={'Daily Max Temp'} />
                <Line
                    dot={false}
                    connectNulls
                    dataKey={convertToTemp('dailyMinTemp')}
                    // stroke={'indianred'}
                    strokeWidth={2}
                    name={'Daily Min Temp'} />

                <Bar
                    dataKey={convertGdd('dailyGdd40')}
                    name={'Growing Degree Days (40)'}
                    stroke={'goldenrod'}
                />
                <Bar
                    dataKey={convertPrecip('dailyPrecip50')}
                    name={'Precip 50'}
                    stroke={'slateblue'}
                />
                <XAxis dataKey={formatDate} />
                <YAxis/>
                </ComposedChart>
            </ResponsiveContainer>
        </Container>
    )
}

export default ClimateNorms