import React from 'react'
import { Form, Header } from 'semantic-ui-react'
import { withFormik, FormikProps, FormikValues, FormikBag } from 'formik'

const EntryCategories = [
    { key: 'VEGETATIVE', value: 'VEGETATIVE', text: 'Vegetative' },
    { key: 'REPRODUCTIVE', value: 'REPRODUCTIVE', text: 'Reproductive' },
    { key: 'FRUIT_SEED', value: 'FRUIT_SEED', text: 'Fruit/Seed' },
]

const AddEntryForm = ({
    handleSubmit,
    setFieldValue,
    handleChange,
}: FormProps & FormikProps<FormValues>) => {
    return (
        <div>
            <Header>Add New Entry</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Select
                    label="Category"
                    options={EntryCategories}
                    placeholder="Category"
                    name="category"
                    onChange={(e, {value}) => setFieldValue('category', value)}
                />
                <Form.Input
                    label="Phenophase"
                    name="phenophase"
                    onChange={handleChange}
                />
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
}

interface FormValues {
    category: string
    phenophase: string
    note: string
}

const initialValues = {
    category: '',
    phenophase: '',
    note: '',
}

export default withFormik<FormProps, FormValues>({
    handleSubmit: (
        values: FormikValues,
        { props }: FormikBag<FormProps, any>,
    ) => {
        console.log({ values }, { props })
        props.closeModal()
    },
    mapPropsToValues: () => initialValues,
})(AddEntryForm)
