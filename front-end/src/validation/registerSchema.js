import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    username: yup
    .string()
    .required('A username is required!')
    .min(5, "Your username should be at least 5 characters long."),
    password: yup
    .string()
    .required('A Password is required!')
    .min(4, "A users password should be at least 4 characters long."),
    phonenumber: yup
    .number()
    .required('A phone number is required!')
})