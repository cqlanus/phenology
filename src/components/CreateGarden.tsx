import React from 'react'
import styled from 'styled-components'
import { Form, Header } from 'semantic-ui-react'

import plants from '../data/plants.json'

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
`

interface Props {
    flex: string
}
const CheckboxContainer = styled.div`
    flex-grow: 1;
    margin-right: 0.5em;
`

const Input = styled(Form.Input)`
    width: 60px;
`

const PlantContainer = styled.div`
    height: 30vh;
    overflow: scroll;
    margin-bottom: 1em;
`

const CreateGarden = () => {

    return (
        <div>
            <Header>Create A New Garden</Header>
            <Form>
                <Form.Input label="Garden Name" />

                <Header>Add Some Plants</Header>
                <Row>
                    <span>Plant</span>
                    <span>Qty</span>
                </Row>
                <PlantContainer>
                    
                {
                    plants.map((plant, idx) => {
                        const label = `${plant.commonName} / ${plant.latinName}`
                        return (
                            <Row key={idx}>
                                <CheckboxContainer>
                                    <Form.Checkbox label={label} />
                                </CheckboxContainer>
                                <Input size="small" type="number" min={0} />
                            </Row>
                        )
                    })
                }
                </PlantContainer>
                
                <Form.Button fluid type="submit">Create</Form.Button>

            </Form>
        </div>
    )
}

export default CreateGarden