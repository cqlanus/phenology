import React from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { withFormik, FormikValues, FormikBag } from 'formik'

interface FormValues {
    commonName: string
    latinName: string
    type: string
    isNative: boolean
}

interface FormProps {
    
}

const NewPlantModal = ({handleSubmit}: any) => {
    
    const options = [
        { key: 'tree', text: 'tree', value: 'tree'},
        { key: 'shrub', text: 'shrub', value: 'shrub'},
        { key: 'grass', text: 'grass', value: 'grass'},
        { key: 'herb', text: 'herb', value: 'herb'},
        { key: 'bulb', text: 'bulb', value: 'bulb'},
    ]

    
    return (
        <Modal trigger={<Button size="mini">New Plant</Button>}>
            <Modal.Header>New Plant</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Input label="Common Name" />
                        <Form.Input label="Latin Name" />
                        <Form.Select options={options} label="Type" />
                        <Form.Field>
                            <label>Native?</label>
                            <Form.Checkbox toggle/>
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

export default withFormik({
    handleSubmit: (values: FormikValues, formikBag: FormikBag<FormProps, FormValues>) => {
        console.log({values, formikBag})
    }
})(NewPlantModal)