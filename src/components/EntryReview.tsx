import React from 'react'
import styled from 'styled-components'
import { Table } from 'semantic-ui-react'
import CenterWrapper from './CenterWrapper'
import { Planting } from '../types/user'

const Container = styled.div`
    overflow: scroll;
`

interface Props {
    plantings: Planting[]
}
const EntryReview = ({ plantings }: Props) => {
    const renderHeader = () => {
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Common Name</Table.HeaderCell>
                    <Table.HeaderCell>Latin Name</Table.HeaderCell>
                    <Table.HeaderCell>Qty</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }

    const renderRow = (planting: Planting) => {
        return (
            <Table.Row key={planting.plantingId}>
                <Table.Cell>{planting.plant.commonName}</Table.Cell>
                <Table.Cell>{planting.plant.latinName}</Table.Cell>
                <Table.Cell>{planting.qty}</Table.Cell>
            </Table.Row>
        )
    }

    const renderBody = () => {
        return <Table.Body>{plantings.map(renderRow)}</Table.Body>
    }

    return (
        <CenterWrapper>
            <Container>
                <Table striped selectable>
                    {renderHeader()}
                    {renderBody()}
                </Table>
            </Container>
        </CenterWrapper>
    )
}

export default EntryReview
