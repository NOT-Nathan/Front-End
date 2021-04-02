import * as yup from 'yup';

const editUserSchema = yup.object().shape({
    password: yup
    .string()
    .required('A Password change is required!'),
    phonenumber: yup
    .string()
    .required('A Phone Number change is required!')
})

export default editUserSchema
//Might not work correctly I still need to test this.