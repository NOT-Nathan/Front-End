import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import { registerSchema } from '../validation/registerSchema';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory, Link } from "react-router-dom";

const initialFormValues = {
    id: '',
    username: '',
    phonenumber: '',
    password: '',
}

const initialFormErrors = {
    username: '',
    phonenumber: '',
    password: '',
}

const initialDisabled = true

const Register = () => {
  
    const [ formValues, setFormValues ] = useState(initialFormValues);
    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ disabled, setDisabled ] = useState(initialDisabled);
  
    const { push } = useHistory();
    
    const onChange = (e) => {
      yup
        .reach(registerSchema, e.target.name)
        .validate(e.target.value)
          .then(() => 
            setFormErrors({
              ...formErrors,
              [e.target.name]: ''
          }))
          .catch(({errors}) => 
            setFormErrors({
              ...errors, 
              [e.target.name]: formErrors[0]
          }));
      
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
      <Styled>
        <div>
          <h1>Water my Plants</h1>
          <div>
          <h3>Fill out this form to create your account.</h3>
            <form onSubmit={onSubmit} className='form'>
            <div>{formErrors.username}</div>
            <div>{formErrors.password}</div>
            <div>{formErrors.phonenumber}</div>
                <label>Username
                    <input 
                        onChange={onChange}
                        type='text'
                        name='username'
                        value={formValues.username}
                    />
                </label>
                <label>Password
                    <input 
                    onChange={onChange}
                    type='password'
                    name='password'
                    value={formValues.password}
                    />
                </label>
                <label>Phone Number
                    <input 
                    onChange={onChange}
                    type='tel'
                    name='phonenumber'
                    value={formValues.phonenumber}
                    />
                </label>
                <Link to='/' className='btn'>
                <button disabled={disabled}>Register</button>
                </Link>
            </form>
            </div>
        </div>
      </Styled>
    )
};

export default Register;

const Styled = styled.div`

& .form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

& .btn{
  width: 50%;
}

button{
  width: 30%;
}

`
