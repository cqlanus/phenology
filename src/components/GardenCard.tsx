import React from 'react'
import styled from 'styled-components'

import Card from './Card'

interface Props {
    garden: any
}

const GardenCard = ({garden}: Props) => (
    <Card>
        {garden.name}
    </Card>
)

export default GardenCard