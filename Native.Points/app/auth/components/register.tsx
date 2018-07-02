import React, { Component } from 'react';
import { Text, Container, Form, View, Button, Input, Content, Item } from 'native-base';
import { Formik, FormikProps, FieldProps, Field, withFormik, FormikErrors } from 'formik';
import Yup from 'yup';

import { Toolbar } from '../../shared/components/header';
import { IBaseProps } from '../../navigation/components';
import TextInput from '../../shared/form/components/text-input';


// export default class Register extends Component<IBaseProps> {
//     public render(): JSX.Element {
//         debugger;
//         return (
//             <Container>
//                 <Toolbar {...{ ...this.props, disableMenuButton: true, enableBackButton: true }} />
//                 <Form>
//                     <TextInput
//                         error={''} touched={''} />
//                 </Form>
//             </Container>
//         );
//     }
// }

// Shape of form values
interface FormValues {
    email: string;
    password: string;
}

interface OtherProps {
    message: string;
    onChangeText: (e: any) => void
}

// You may see / user InjectedFormikProps<OtherProps, FormValues> instead of what comes below. They are the same--InjectedFormikProps was artifact of when Formik only exported an HOC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message } = props;
    return (
        <Content>
            <Form>
                <TextInput
                    name='email'
                    onChangeText={(name: string, value: any) => {
                        debugger;
                        props.setFieldValue('email', value)
                    }}
                    value={props.values.email} />
                <Text>
                    {touched && errors.email}
                </Text>
            </Form>
        </Content>
    );
};

// The type of props MyForm receives
interface MyFormProps {
    onChangeText: (e: any) => void
    initialEmail?: string;
    message: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the using withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            email: props.initialEmail || '',
            password: ''
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
        debugger;
        let errors: FormikErrors<FormValues> = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (true) {
            errors.email = 'Invalid email address';
        }
        return errors;
    },

    handleSubmit: values => {
        // do submitting things
    },
})(InnerForm);

// Use <MyForm /> anywhere
const Basic = () => (
    <Container>
        <MyForm message="Sign up" onChangeText={() => {
            debugger;
        }} />
    </Container>
);

export default Basic;