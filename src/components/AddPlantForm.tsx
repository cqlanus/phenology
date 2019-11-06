import React from 'react'
import styled from 'styled-components'
import {
    Card,
    Checkbox,
    Button,
    Form,
    Label,
    Icon,
    Image,
} from 'semantic-ui-react'
import { withFormik, FormikProps, FormikBag } from 'formik'
import { NetworkPlant, PlantArgs } from '../types/user'
import { usePlant } from '../hooks/plant'
import { PlantSelection } from '../redux/planting'
import NewPlantModal from './NewPlantModal'
import { BREAKPOINTS } from '../data/breakpoints'

const Row = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
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

const StyledImage = styled(Image)`
    &&&&& {
        margin-right: 1em !important;
    }
`

const StyledLabel = styled(Label)`
    &&& {
        margin-right: 1em;
    }
`

const CheckboxContainer = styled.div`
    flex-grow: 1;
    margin-right: 0.5em;
`

const Input = styled(Form.Input)`
    width: 60px;
`

const PlantContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 1em;

    @media (min-width: ${BREAKPOINTS.TABLET}px) {
        grid-template-columns: 1fr 1fr;
    }
`
const StyledCard = styled(Card)`
    &&&&&& {
        margin: 1em 0;
    }
`

const RED: 'red' = 'red'
const BLUE: 'blue' = 'blue'
const PURPLE: 'purple' = 'purple'
const ORANGE: 'orange' = 'orange'
const TEAL: 'teal' = 'teal'

const PLANT_TYPE_COLOR_MAPPING: {
    [key: string]: 'red' | 'blue' | 'purple' | 'orange' | 'teal' | undefined
} = {
    GRASS: RED,
    SHRUB: BLUE,
    TREE: PURPLE,
    HERB: ORANGE,
    BULB: TEAL,
}

const AddPlantForm = ({
    plants,
    handleSubmit,
    setFieldValue,
    addPlant
}: Props & FormikProps<FormValues>) => {
    const { checked, handleCheck } = usePlant()

    const handleChange = (plant: NetworkPlant) => () => {
        const updatedChecked = handleCheck(plant)
        setFieldValue('selectedPlants', updatedChecked)
    }

    const updateQty = (plant: NetworkPlant) => (e: any, { value }: any) => {
        const checkedPlant = checked[plant.commonName]

        if (checkedPlant) {
            const updatedPlant = { ...checkedPlant, qty: +value }
            checked[plant.commonName] = updatedPlant
        }
    }

    const renderPlant = (plant: NetworkPlant, idx: number) => {
        const hasChecked = !!checked[plant.commonName]
        return (
            <StyledCard key={plant.id} fluid>
                <Card.Content>
                    {plant.image && (
                        <StyledImage floated="left" src={plant.image} />
                    )}
                    <Card.Header>{plant.commonName}</Card.Header>
                    <Card.Meta>{plant.latinName}</Card.Meta>
                    {plant.isNative && (
                        <Label corner="right" color="green">
                            <Icon name="check" />
                        </Label>
                    )}
                </Card.Content>
                <Card.Content>
                    <Row>
                        <StyledLabel color={PLANT_TYPE_COLOR_MAPPING[plant.type]}>
                            {plant.type}
                        </StyledLabel>
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
                </Card.Content>
            </StyledCard>
        )
    }

    const renderPlants = () => {
        return (
            <PlantContainer>
                {plants.map(renderPlant)}
            </PlantContainer>
        )
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <Icon color="green" name="check circle" />
            <span>= Native</span>
            {renderPlants()}
            <NewPlantModal shouldAddPlanting={true} fluid addPlant={addPlant} buttonTitle="Create New Plant" />
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
    plants: NetworkPlant[]
    addPlantings: (selection: PlantSelection) => void
    closeModal: () => void,
    addPlant: (plant: PlantArgs) => void,
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
