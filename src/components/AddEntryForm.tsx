import React, { useState } from 'react'
import { Form, Header } from 'semantic-ui-react'
import { withFormik, FormikProps, FormikBag } from 'formik'
import PHENOPHASE from '../data/phenophase.json'
import { AddEntryInput, Entry } from '../types/user'

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
    handleRemove,
    setFieldValue,
    handleChange,
    entry,
    values
}: FormProps & FormikProps<FormValues>) => {
    const initialCategory = entry ? entry.category : ''
    const [ category, setCategory ] = useState(initialCategory)

    const phenophase: { [key: string]: Phenophase[]} = PHENOPHASE
    const selectCategory = (e: any, {value}: any) => {
        setCategory(value)
        setFieldValue('category', value)
    }
    
    const options = (phenophase[category] || []).map(phase => {
        const { description, ...rest } = phase
        return rest
    })
    
    const headerTexxt = entry ? 'Update Entry' : 'Add New Entry'
    const buttonText = entry ? 'Update Entry' : 'Create Entry'
    
    return (
        <div>
            <Header>{headerTexxt}</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Select
                    label="Category"
                    options={EntryCategories}
                    placeholder="Category"
                    name="category"
                    onChange={selectCategory}
                    value={values.category}
                />
                <Form.Select
                    label="Phenophase"
                    placeholder="Phenophase"
                    name="phenophase"
                    options={options || []}
                    onChange={(e, {value}) => setFieldValue('phenophase', value)}
                    value={values.phenophase}
                />
                <Form.Input 
                    label="Date"
                    name="created"
                    onChange={handleChange}
                    value={values.created}
                    type="date" />
                <Form.TextArea
                    label="Notes"
                    name="note"
                    value={values.note}
                    onChange={handleChange}
                />
                <Form.Button fluid type="submit">
                    {buttonText}
                </Form.Button>
                {entry && <Form.Button negative fluid onClick={handleRemove} >
                    {'Remove'}
                </Form.Button>}
            </Form>
        </div>
    )
}

interface FormProps {
    closeModal: () => void
    handleSubmitForm: (input: AddEntryInput, plantingId: string) => void
    plantingId: string | undefined
    entry: Entry | undefined
    handleRemove: () => void
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
        const { handleSubmitForm, closeModal, plantingId } = props
        plantingId && handleSubmitForm(values, plantingId)
        closeModal()
    },
    mapPropsToValues: ({ entry }: FormProps) => {
        return entry || initialValues
    },
})(AddEntryForm)
