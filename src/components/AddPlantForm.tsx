import React from 'react'
import styled from 'styled-components'
import { Card, Checkbox, Button, Form, Label, Icon } from 'semantic-ui-react'
import { withFormik, FormikProps, FormikBag } from 'formik'
import { QtyPlant } from '../types/entities'
import { usePlant } from '../hooks/plant'
import { PlantSelection } from '../redux/planting'

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
`

const AddButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 999;
    padding: 0.5em;
`

const StyledForm = styled(Form)`
    margin-bottom: 4em;
`

const CheckboxContainer = styled.div`
    flex-grow: 1;
    margin-right: 0.5em;
`

const Input = styled(Form.Input)`
    width: 60px;
`

const RED: "red" = "red"
const BLUE: "blue" = "blue"
const PURPLE: "purple" = "purple"
const ORANGE: "orange" = "orange"
const TEAL: "teal" = "teal"

const PLANT_TYPE_COLOR_MAPPING: { [key: string]: "red" | "blue" | "purple" | "orange" | "teal" | undefined } = {
    GRASS: RED,
    SHRUB: BLUE,
    TREE: PURPLE,
    HERB: ORANGE,
    BULB: TEAL
}

const AddPlantForm = ({
    plants,
    handleSubmit,
    setFieldValue,
}: Props & FormikProps<FormValues>) => {
    const { checked, handleCheck } = usePlant()

    const handleChange = (plant: QtyPlant) => () => {
        const updatedChecked = handleCheck(plant)
        setFieldValue('selectedPlants', updatedChecked)
    }

    const updateQty = (plant: QtyPlant) => (e: any, { value }: any) => {
        const checkedPlant = checked[plant.commonName]

        if (checkedPlant) {
            const updatedPlant = { ...checkedPlant, qty: +value }
            checked[plant.commonName] = updatedPlant
        }
    }

    const renderPlant = (plant: QtyPlant) => {
        const hasChecked = !!checked[plant.commonName]
        return (
            <Card key={plant.id} fluid>
                <Card.Content>
                    <Card.Header>{plant.commonName}</Card.Header>
                    <Card.Meta>{plant.latinName}</Card.Meta>
                    {plant.isNative && <Label corner="right" color="green">
                        <Icon name="check" />
                    </Label>}
                    <Label ribbon="right" color={PLANT_TYPE_COLOR_MAPPING[plant.type]} >{plant.type}</Label>
                </Card.Content>
                <Row>
                    <CheckboxContainer>
                        <Checkbox toggle onChange={handleChange(plant)} />
                    </CheckboxContainer>

                    {hasChecked && (
                        <Input
                            size="mini"
                            type="number"
                            defaultValue={1}
                            min={0}
                            onChange={updateQty(plant)}
                        />
                    )}
                </Row>
            </Card>
        )
    }

    const renderPlants = () => plants.map(renderPlant)

    return (
        <StyledForm onSubmit={handleSubmit}>
            <Icon color="green" name="check circle" />
            <span>= Native</span>
            {renderPlants()}
            <AddButtonContainer>
                <Button type="submit" fluid>
                    Add Plants
                </Button>
            </AddButtonContainer>
        </StyledForm>
    )
}

interface FormValues {
    selectedPlants: PlantSelection
}

const initialValues: FormValues = {
    selectedPlants: {},
}

interface Props {
    plants: QtyPlant[]
    addPlantings: (selection: PlantSelection) => void
    closeModal: () => void
}

export default withFormik<Props, FormValues>({
    handleSubmit: (
        { selectedPlants }: FormValues,
        { props: { addPlantings, closeModal } }: FormikBag<Props, any>,
    ) => {
        addPlantings(selectedPlants)
        closeModal()
    },
    mapPropsToValues: () => initialValues,
})(AddPlantForm)
