import React, { useState } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { withFormik, FormikValues, FormikBag, FormikProps } from 'formik'
import { PlantArgs } from '../types/user'

interface FormValues {
    commonName: string
    latinName: string
    type: string
    isNative: boolean
}

interface FormProps {
    addPlant: (plant: PlantArgs) => void
}

const NewPlantModal = ({handleSubmit, handleChange, setFieldValue, addPlant}: FormProps & FormikProps<FormValues>) => {

    const [ isOpen, setOpen ] = useState(false)
    
    const options = [
        { key: 'tree', text: 'tree', value: 'tree'},
        { key: 'shrub', text: 'shrub', value: 'shrub'},
        { key: 'grass', text: 'grass', value: 'grass'},
        { key: 'herb', text: 'herb', value: 'herb'},
        { key: 'bulb', text: 'bulb', value: 'bulb'},
    ]

    const close = () => setOpen(false)

    const open = () => setOpen(true)
    
    const submit = () => {
        handleSubmit()
        close()
    }
    
    const handleSelect = (thing: any, { name, value, toggle, checked }: any) => {
        const finalValue = toggle ? checked : value
        setFieldValue(name, finalValue)
    }

    return (
        <Modal onClose={close} open={isOpen} trigger={<Button type="button" onClick={open} size="mini">New Plant</Button>}>
            <Modal.Header>New Plant</Modal.Header>
            <Modal.Content>
                <Form onSubmit={submit}>
                    <Form.Group widths="equal">
                        <Form.Input label="Common Name" name="commonName" onChange={handleChange} />
                        <Form.Input label="Latin Name" name="latinName" onChange={handleChange} />
                        <Form.Select options={options} label="Type" name="type" onChange={handleSelect} />
                        <Form.Field>
                            <label>Native?</label>
                            <Form.Checkbox toggle name="isNative" onChange={handleSelect} />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        
                    </Form.Group>
                    <Form.Button type="submit" fluid >Add new plant</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

const initialValues: FormValues = {
    commonName: '',
    latinName: '',
    isNative: false,
    type: ''
}

export default withFormik({
    handleSubmit: (values: FormikValues, formikBag: FormikBag<FormProps, FormValues>) => {
        const { resetForm, props } = formikBag
        const { addPlant } = props
        const { commonName, latinName, isNative, type } = values
        const plant = { commonName, latinName, isNative, type, qty: 1, id: 'newplant' }
        addPlant(plant)
        resetForm()
    },
    mapPropsToValues: () => initialValues
})(NewPlantModal)