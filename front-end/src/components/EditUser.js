import React, { useEffect, useState, useContext  } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../helpers/axiosWithAuth';
import * as yup from 'yup';
import editUserSchema from '../validation/editUserSchema';

const EditUser = () => {

    const { formValues, setFormValues } = useContext(UserContext);

    const initialFormErrors = {
        nickname: '',
        species: '',
        H2O: '',
        img: ''
    }

    const initialDisabled = true

    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ disabled, setDisabled ] = useState(initialDisabled);

    const { push } = useHistory();

    const saveEdit = e => {
        e.preventDefault();
        axiosWithAuth().put(`https://tt130bwplants.herokuapp.com/api/user/${formValues.id}`, formValues)
            .then(res => {
                console.log(res)
                setFormValues(res.data)
            })
            .catch(err => console.log(err));
        push('/plants')
    };

    const deleteUser = e => {
        axiosWithAuth().delete(`https://tt130bwplants.herokuapp.com/api/user/${formValues.id}`)
            .then(res => {
                console.log(res);
                setFormValues(formValues);
            })
            .catch(err => console.log(err));
        push('/')
    };

    const handleChange = (e) => {

        yup
        .reach(editUserSchema, e.target.name)
        .validate(e.target.value)
          .then(() => setFormErrors({
            ...formErrors, 
            [e.target.name]: ''
          }))
          .catch(({errors}) => setFormErrors({
            ...errors, 
            [e.target.name]: formErrors[0]
          }));

        setUser({ 
            ...user, 
        setFormValues({ 
            ...formValues, 

            [e.target.name]: e.target.value 
        })
    };

    useEffect(() => {
        editUserSchema
          .isValid(user)
          .then(valid => setDisabled(!valid))
        }, [user])

    return(
        <>
        <h1>Edit My Account</h1>
        
        <form onSubmit={saveEdit}>

            <label htmlFor="password">Password:</label>
            <input
                name="password"
                onChange={handleChange}
                value={formValues.password}
            />
    
            <label htmlFor="phone">Phone Number:</label>
            <input
                name="phone"
                onChange={handleChange}
                value={formValues.phonenumber}
            />
    
            <button disabled={disabled}>Save</button>
            <button onClick={() => deleteUser}>Delete Account</button>
        </form>
        </>
    )
};

export default EditUser;