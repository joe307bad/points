import * as yup from 'yup';

// TODO probably should be `yup.object<UserDto>...` but then forces you to add id, roles, etc.
export const LoginSchema = yup.object().shape({
    userName: yup.string()
        .trim('Required')
        .required('Required'),
    password: yup.string()
        .required('Required')
});
