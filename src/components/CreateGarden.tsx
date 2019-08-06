import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Header, Loader } from 'semantic-ui-react'
import { withFormik, FormikProps, FormikValues, FormikBag } from 'formik'

import { QtyPlant } from '../redux/plants'

import NewPlantModal from '../components/NewPlantModal'

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

const CreateGarden = ({
    handleSubmit, 
    setFieldValue, 
    handleChange, 
    plants, 
    getPlants,
    loading
}: FormProps & FormikProps<FormValues>) => {

    useEffect(() => {
        getPlants()
    }, [getPlants])
    
    const initialChecked: { [key: string]: QtyPlant } = {}
    const [checked, setChecked] = useState(initialChecked)

    const handleCheck = (plant: QtyPlant) => () => {
        const { commonName } = plant
        let updatedChecked = {}

        if (checked[commonName]) {
            const { [commonName]: value, ...newChecked } = checked
            updatedChecked = newChecked
        } else {
            const newChecked = { ...checked, [commonName]: plant }
            updatedChecked = newChecked
        }

        setChecked(updatedChecked)
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
                const checkedPlant = checked[plant.commonName]
                const hasChecked = !!checkedPlant
                return (
                    <Row key={idx}>
                        <CheckboxContainer>
                            <Form.Checkbox
                                onChange={handleCheck(plant)}
                                label={label}
                            />
                        </CheckboxContainer>
                        {hasChecked ? (
                            <Input size="mini" type="number" defaultValue={1} min={1} onChange={updateQty(plant)} />
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
                <Form.Input label="Garden Name" onChange={handleChange} name='gardenName' />

                <Header>Add Some Plants</Header>
                <Row>
                    <span>Plant</span>
                    <span>Qty</span>
                </Row>
                {renderPlants()}
                <NewPlantModal/>
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
    gardenName: string
    plants: Plants
}

const initialValues: FormValues = {
    gardenName: '',
    plants: {}
}

interface FormProps {
    getPlants: () => void,
    plants: QtyPlant[],
    loading: boolean
}

export default withFormik<FormProps, FormValues>({
    handleSubmit: (values: FormikValues, formikBag: FormikBag<FormProps, any>) => {
        console.log({values})
    },
    mapPropsToValues: () => initialValues
})(CreateGarden)
