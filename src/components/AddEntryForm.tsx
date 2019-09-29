import React, { useState } from 'react'
import { Form, Header } from 'semantic-ui-react'
import { withFormik, FormikProps, FormikBag } from 'formik'
import PHENOPHASE from '../data/phenophase.json'
import { AddEntryInput } from '../types/user.js'

const EntryCategories = [
    { key: 'V', value: 'VEGETATIVE', text: 'Vegetative' },
    { key: 'R', value: 'REPRODUCTIVE', text: 'Reproductive' },
    { key: 'FS', value: 'FRUIT_SEED', text: 'Fruit/Seed' },
]

interface Phenophase {
    key: string,
    value: string,
    text: string,
    description: string
}

const AddEntryForm = ({
    handleSubmit,
    setFieldValue,
    handleChange,
}: FormProps & FormikProps<FormValues>) => {
    const [ category, setCategory ] = useState('')
    const phenophase: { [key: string]: Phenophase[]} = PHENOPHASE
    const selectCategory = (e: any, {value}: any) => {
        setCategory(value)
        setFieldValue('category', value)
    }
    

    const options = (phenophase[category] || []).map(phase => {
        const { description, ...rest } = phase
        return rest
    })
    
    return (
        <div>
            <Header>Add New Entry</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Select
                    label="Category"
                    options={EntryCategories}
                    placeholder="Category"
                    name="category"
                    onChange={selectCategory}
                />
                <Form.Select
                    label="Phenophase"
                    placeholder="Phenophase"
                    name="phenophase"
                    options={options || []}
                    onChange={(e, {value}) => setFieldValue('phenophase', value)}
                />
                <Form.Input 
                    label="Date"
                    name="created"
                    onChange={handleChange}
                    type="date" />
                <Form.TextArea
                    label="Notes"
                    name="note"
                    onChange={handleChange}
                />
                <Form.Button fluid type="submit">
                    Create Entry
                </Form.Button>
            </Form>
        </div>
    )
}

interface FormProps {
    closeModal: () => void
    addEntryToPlanting: (input: AddEntryInput, plantingId: string) => void
    plantingId: string | undefined
}

interface FormValues {
    category: string
    phenophase: string
    note: string
    created: string
}

const initialValues = {
    category: '',
    phenophase: '',
    note: '',
    created: '',
}

export default withFormik<FormProps, FormValues>({
    handleSubmit: (
        values: FormValues,
        { props }: FormikBag<FormProps, any>,
    ) => {
        // console.log({ values }, { props })
        const { addEntryToPlanting, closeModal, plantingId } = props
        plantingId && addEntryToPlanting(values, plantingId)
        closeModal()
    },
    mapPropsToValues: () => initialValues,
})(AddEntryForm)
