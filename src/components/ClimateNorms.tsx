import React from 'react'
import styled from 'styled-components'
import { ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, Area, Tooltip } from 'recharts'
import moment from 'moment'

import { ClimateNorms as ClimateNormsType } from '../types/climate'

interface Props {
    norms: ClimateNormsType
}

const Container = styled.div`
    height: 100%;
    padding: 0 0.5em;
    min-height: 30vh;
    overflow: scroll;
`

const ClimateNorms = ({ norms }: Props) => {
    if (!norms || norms.length === 0) { return null }
    const convertToTemp = (key: string) => (d: any) => d[key] && d[key] / 10

    const convertGdd = (key: string) => (d: any) => d[key] && d[key] > 0 ? d[key] : 0
    const convertPrecip = (key: string) => (d: any) => d[key] && d[key] > 0 ? d[key] / 10 : 0
    const formatDate = (d: any) => moment(d.date, "MM-DD").format("M/D")
    
    return (
        <Container>
            <ResponsiveContainer minWidth={"700px"} height={"100%"}>
                <ComposedChart data={norms}>
                <Line
                    dot={false}
                    connectNulls
                    dataKey={convertToTemp('dailyMaxTemp')}
                    stroke={'indianred'}
                    strokeWidth={2}
                    name={'Dly Max Temp'} />
                <Line
                    dot={false}
                    connectNulls
                    dataKey={convertToTemp('dailyMinTemp')}
                    // stroke={'indianred'}
                    strokeWidth={2}
                    name={'Dly Min Temp'} />

                <Area
                    dataKey={convertGdd('dailyGdd40')}
                    name={'GDD (40)'}
                    fill={'goldenrod'}
                    stroke={'goldenrod'}
                />
                <Area
                    dataKey={convertPrecip('dailyPrecip50')}
                    name={'Precip 50'}
                    fill={'slateblue'}
                    stroke={'slateblue'}
                />
                <XAxis dataKey={formatDate} />
                <YAxis/>
                <Tooltip/>
                </ComposedChart>
            </ResponsiveContainer>
        </Container>
    )
}

export default ClimateNorms