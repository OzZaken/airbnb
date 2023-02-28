import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export const MyForm = () => {

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Shorttttttttttttt!')
            .max(7, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    })

    const onSubmit = values => {
        const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            isAdmin: true
        }
        console.log(user)
    }

    const CustomInput = (props) => (
        <TextField className="my-custom-input" type="text" {...props} />
    )

    return (
        <div>
            <h1>Signup</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field as={CustomInput} name="firstName" />
                        {errors.firstName && touched.firstName ? (
                            <span>{errors.firstName}</span>
                        ) : null}
                        <Field name="lastName" />
                        {errors.lastName && touched.lastName ? (
                            <div>{errors.lastName}</div>
                        ) : null}
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <Button variant="contained" type="submit">Submit!</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
