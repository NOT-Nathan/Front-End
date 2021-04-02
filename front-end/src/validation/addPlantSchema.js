import * as yup from 'yup';

 const addPlantSchema = yup.object().shape({
    nickname: yup
    .string()
    .required('A nickname is required!'),
    species: yup
    .string()
    .required('A species type is required!'),
    H2O: yup
    .string()
    .required('H2O frequency needed!'),
    img: yup
    .string()
})

export default addPlantSchema;