import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, Button, Form } from 'semantic-ui-react'
import { withFormik, FormikValues, FormikBag, FormikProps } from 'formik'
import * as Yup from 'yup'
import { PlantArgs } from '../types/user'

const hasError = (errors: any, touched: any) => (field: string) => touched[field] && errors[field]

const Row = styled.div`
    display: flex;
    justify-content: space-around;
`

interface FormValues {
    commonName: string
    latinName: string
    type: string
    isNative: boolean
    hasNeedles: boolean
    isDeciduous: boolean
    isPerennial: boolean
}

interface FormProps {
    addPlant: (plant: PlantArgs, shouldAddPlanting: boolean) => void
    buttonTitle?: string
    fluid?: boolean
    shouldAddPlanting?: boolean
}

const NewPlantModal = ({
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    buttonTitle = 'New Plant',
    fluid,
    errors,
    touched,
    resetForm
}: FormProps & FormikProps<FormValues>) => {
    const [isOpen, setOpen] = useState(false)
    const hasErrorsForField = hasError(errors, touched)

    const options = [
        { key: 'tree', text: 'tree', value: 'TREE' },
        { key: 'shrub', text: 'shrub', value: 'SHRUB' },
        { key: 'grass', text: 'grass', value: 'GRASS' },
        { key: 'herb', text: 'herb', value: 'HERB' },
        { key: 'bulb', text: 'bulb', value: 'BULB' },
    ]

    const close = () => {
        resetForm()
        setOpen(false)
    }

    const open = () => setOpen(true)

    const submit = () => {
        handleSubmit()
        close()
    }

    const handleSelect = (
        thing: any,
        { name, value, toggle, checked }: any,
    ) => {
        const finalValue = toggle ? checked : value
        setFieldValue(name, finalValue)
    }

    return (
        <Modal
            onClose={close}
            open={isOpen}
            trigger={
                <Button fluid={fluid} type="button" onClick={open} size="mini">
                    {buttonTitle}
                </Button>
            }>
            <Modal.Header>New Plant</Modal.Header>
            <Modal.Content>
                <Form onSubmit={submit}>
                    <Form.Group widths="equal">
                        <Form.Input
                            label="Common Name"
                            name="commonName"
                            error={hasErrorsForField('commonName')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Input
                            label="Latin Name"
                            name="latinName"
                            error={hasErrorsForField('latinName')}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Form.Select
                            options={options}
                            label="Type"
                            name="type"
                            error={hasErrorsForField('type')}
                            onChange={handleSelect}
                            onBlur={handleBlur}
                        />
                    </Form.Group>
                        <Row>

                            <Form.Field>
                                <label>Native?</label>
                                <Form.Checkbox
                                    toggle
                                    name="isNative"
                                    onChange={handleSelect}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Has Needles?</label>
                                <Form.Checkbox
                                    toggle
                                    name="hasNeedles"
                                    onChange={handleSelect}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Deciduous?</label>
                                <Form.Checkbox
                                    toggle
                                    name="isDeciduous"
                                    onChange={handleSelect}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Perennial?</label>
                                <Form.Checkbox
                                    toggle
                                    name="isPerennial"
                                    onChange={handleSelect}
                                />
                            </Form.Field>
                        </Row>
                    <Form.Button onClick={submit} fluid>
                        Add new plant
                    </Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

const initialValues: FormValues = {
    commonName: '',
    latinName: '',
    isNative: false,
    hasNeedles: false,
    isDeciduous: false,
    isPerennial: false,
    type: '',
}

const NewPlantSchema = Yup.object().shape({
    commonName: Yup.string()
        .required('Required'),
    latinName: Yup.string()
        .required('Required'),
    type: Yup.string()
        .required('Required'),
})

export default withFormik({
    handleSubmit: (
        values: FormikValues,
        formikBag: FormikBag<FormProps, FormValues>,
    ) => {
        const { resetForm, props } = formikBag
        const { addPlant, shouldAddPlanting } = props
        const { commonName, latinName, isNative, type } = values
        const plant = {
            commonName,
            latinName,
            isNative,
            type,
            qty: 1,
            id: 'newplant',
        }
        addPlant(plant, !!shouldAddPlanting)
        resetForm()
    },
    mapPropsToValues: () => initialValues,
    validationSchema: NewPlantSchema
})(NewPlantModal)
