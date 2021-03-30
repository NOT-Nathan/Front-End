import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import { registerSchema } from '../validation/registerSchema';
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const initialFormValues = {
    username: '',
    phonenumber: '',
    password: '',
}

const initialFormErrors = {
    userName: '',
    phoneNumber: '',
    passWord: '',
}

const initialDisabled = true

const Register = () => {
  
    const [ formValues, setFormValues ] = useState(initialFormValues);
    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ post, setPost ] = useState();
    const [ disabled, setDisabled ] = useState(initialDisabled);
  
    const {push} = useHistory();
    
    const onChange = (name, value, e) => {
      yup.reach(registerSchema, name)
        .validate(value)
          .then(() => setFormErrors({...formErrors, [name]: ''}))
          .catch(({errors}) => setFormErrors({...errors, [name]: formErrors[0]}));
      
        setFormValues({
          ...formValues,
          [e.target.name]: e.target.value,
        })
      };
  
     const onSubmit = e => {
        e.preventDefault();
        axios.post('https://tt130bwplants.herokuapp.com/api/auth/register', formValues)
            .then(res => {
                console.log(res);
                setFormValues(res.data.new_user);
            })
            .catch(err => console.log(err));
            push('/plants')
      };
  
      useEffect(() => {
        registerSchema.isValid(formValues)
        .then(valid => setDisabled(!valid))
        }, [formValues])

    return(
        <div>
          <h1>Register a New Account</h1>
  
          <form onSubmit={onSubmit}>
      
            <div>{formErrors.userName}</div>
            <div>{formErrors.passWord}</div>
            <div>{formErrors.phoneNumber}</div>
  
            <label>Username:</label>
            <input
                type='text'
                name='username'
                value={formValues.username}
                onChange={onChange}
            />
  
            <label>Password:</label>
            <input
                type='text'
                name='password'
                value={formValues.password}
                onChange={onChange}
            />

            <label>Phone Number:</label>
            <input
                type='text'
                name='phonenumber'
                value={formValues.phonenumber}
                onChange={onChange}
            />
  
            <button disabled={disabled}>Register</button>
  
        </form>
      </div>
    )
};

export default Register;

