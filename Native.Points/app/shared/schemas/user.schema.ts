import * as yup from 'yup';

// TODO probably should be `yup.object<UserDto>...` but then forces you to add id, roles, etc.
export const RegisterSchema = yup.object().shape({
    userName: yup.string()
        .trim('Required')
        .required('Required'),
    firstName: yup.string()
        .trim('Required')
        .min(2, 'Must be longer than 2 characters')
        .max(20, 'Nice try, nobody has a first name that long')
        .required('Required'),
    lastName: yup.string()
        .trim('Required')
        .min(2, 'Must be longer than 2 characters')
        .max(20, 'Nice try, nobody has a last name that long')
        .required('Required'),
    password: yup.string()
        .min(2, 'Must be longer than 2 characters')
        .max(20, 'Nice try, nobody has a last name that long')
        .required('Required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Password does not match')
        .required('Password confirm is required')
});