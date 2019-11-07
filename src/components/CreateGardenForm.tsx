import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { Form, Header, Loader } from 'semantic-ui-react'
import { withFormik, FormikProps, FormikBag } from 'formik'
import * as Yup from 'yup'

import NewPlantModal from './NewPlantModal'
import { AddGardenInput } from '../redux/garden'
import { usePlant } from '../hooks/plant'
import { PlantArgs, NetworkPlant } from '../types/user'

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    margin: .5em 0;
`

const CheckboxContainer = styled.div`
    margin-left: 0.5em;
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
    loading,
    errors,
}: FormProps & FormikProps<FormValues> & RouteComponentProps) => {
    const { checked, handleCheck } = usePlant()

    useEffect(() => {
        getPlants()
    }, [getPlants])

    const _handleCheck = (plant: NetworkPlant) => () => {
        const updatedChecked = handleCheck(plant)
        setFieldValue('plants', updatedChecked)
    }

    const updateQty = (plant: NetworkPlant) => (e: any, { value }: any) => {
        const checkedPlant = checked[plant.commonName]

        if (checkedPlant) {
            const updatedPlant = { ...checkedPlant, qty: +value }
            checked[plant.commonName] = updatedPlant
        }
    }

    const renderPlants = () => (
        <PlantContainer>
            {plants.map((plant: NetworkPlant, idx: number) => {
                const label = `${plant.commonName} / ${plant.latinName}`
                const justAddedPlant =
                    justAdded && justAdded.commonName === plant.commonName
                const checkedPlant = justAddedPlant
                    ? plant
                    : checked[plant.commonName]
                const hasChecked = !!checkedPlant
                return (
                    <Row key={idx}>
                        <CheckboxContainer>
                            <Form.Checkbox
                                toggle
                                defaultChecked={hasChecked}
                                onChange={_handleCheck(plant)}
                                label={label}
                            />
                        </CheckboxContainer>
                        {hasChecked ? (
                            <Input
                                size="mini"
                                type="number"
                                defaultValue={1}
                                min={0}
                                onChange={updateQty(plant)}
                            />
                        ) : (
                            '0'
                        )}
                    </Row>
                )
            })}
        </PlantContainer>
    )

    const hasErrors = Object.keys(errors).length > 0

    return (
        <div>
            <Header>Create A New Garden</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    label="Garden Name"
                    onChange={handleChange}
                    name="name"
                    error={errors.name}
                />

                <Row>
                    <Header>Add Some Plants</Header>
                    <NewPlantModal addPlant={addPlant} />
                </Row>
                <Row>
                    <span>Plant</span>
                    <span>Qty</span>
                </Row>
                {renderPlants()}

                <Form.Button disabled={hasErrors} fluid type="submit">
                    Create Garden
                </Form.Button>
            </Form>
            <Loader active={loading} />
        </div>
    )
}

interface Plants {
    [key: string]: NetworkPlant & { qty: number }
}

interface FormValues {
    name: string
    plants: Plants
}

const initialValues: FormValues = {
    name: '',
    plants: {},
}

interface FormProps {
    getPlants: () => void
    addPlant: (plant: PlantArgs) => void
    addGardenToUser: (garden: AddGardenInput) => void
    plants: NetworkPlant[]
    loading: boolean
    justAdded?: NetworkPlant
}

const CreateGardenSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
})

export default withFormik<FormProps & RouteComponentProps, FormValues>({
    handleSubmit: (
        values: FormValues,
        { props }: FormikBag<FormProps & RouteComponentProps, any>,
    ) => {
        const { addGardenToUser, history } = props
        addGardenToUser(values)
        history.push('/home')
    },
    mapPropsToValues: () => initialValues,
    validationSchema: CreateGardenSchema,
})(CreateGardenForm)
