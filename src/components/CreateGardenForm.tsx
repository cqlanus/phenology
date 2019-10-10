import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { Form, Header, Loader } from 'semantic-ui-react'
import { withFormik, FormikProps, FormikBag } from 'formik'

import { QtyPlant } from '../types/entities'

import NewPlantModal from './NewPlantModal'
import { AddGardenInput } from '../redux/garden'
import { usePlant } from '../hooks/plant'

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
`

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

const CreateGardenForm = ({
    handleSubmit, 
    setFieldValue, 
    handleChange, 
    plants, 
    getPlants,
    addPlant,
    justAdded,
    loading
}: FormProps & FormikProps<FormValues> & RouteComponentProps) => {

    const { checked, handleCheck } = usePlant()

    useEffect(() => {
        getPlants()
    }, [getPlants])

    const _handleCheck = (plant: QtyPlant) => () => {
        const updatedChecked = handleCheck(plant)
        setFieldValue('plants', updatedChecked)
    }

    const updateQty = (plant: QtyPlant) => (e: any, { value }: any) => {
        const checkedPlant = checked[plant.commonName]

        if (checkedPlant) {
            const updatedPlant = { ...checkedPlant, qty: +value }
            checked[plant.commonName] = updatedPlant
        }
    }

    const renderPlants = () => (
        <PlantContainer>
            {plants.map((plant: QtyPlant, idx: number) => {
                const label = `${plant.commonName} / ${plant.latinName}`
                const justAddedPlant = justAdded && justAdded.commonName === plant.commonName
                const checkedPlant = justAddedPlant ? plant : checked[plant.commonName]
                const hasChecked = !!checkedPlant
                return (
                    <Row key={idx}>
                        <CheckboxContainer>
                            <Form.Checkbox
                                defaultChecked={hasChecked}
                                onChange={_handleCheck(plant)}
                                label={label}
                            />
                        </CheckboxContainer>
                        {hasChecked ? (
                            <Input size="mini" type="number" defaultValue={1} min={0} onChange={updateQty(plant)} />
                        ) : "0"}
                    </Row>
                )
            })}
        </PlantContainer>
    )

    return (
        <div>
            <Header>Create A New Garden</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Input label="Garden Name" onChange={handleChange} name='name' />

                <Row>
                    <Header>Add Some Plants</Header>
                    <NewPlantModal addPlant={addPlant} />
                </Row>
                <Row>
                    <span>Plant</span>
                    <span>Qty</span>
                </Row>
                {renderPlants()}
                
                <Form.Button fluid type="submit">
                    Create Garden
                </Form.Button>
            </Form>
            <Loader active={loading}/>
        </div>
    )
}

interface Plants { [key: string]: QtyPlant }

interface FormValues {
    name: string
    plants: Plants
}

const initialValues: FormValues = {
    name: '',
    plants: {}
}

interface FormProps {
    getPlants: () => void,
    addPlant: (plant: QtyPlant) => void,
    addGardenToUser: (garden: AddGardenInput) => void,
    plants: QtyPlant[],
    loading: boolean,
    justAdded?: QtyPlant
}

export default withFormik<FormProps & RouteComponentProps, FormValues>({
    handleSubmit: (values: FormValues, { props }: FormikBag<FormProps & RouteComponentProps, any>) => {
        const { addGardenToUser, history } = props
        addGardenToUser(values)
        history.push('/home')
    },
    mapPropsToValues: () => initialValues
})(CreateGardenForm)
