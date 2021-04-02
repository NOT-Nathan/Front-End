import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { loginSchema } from '../validation/loginSchema';
import styled from 'styled-components';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const initialFormValues = {
    id: '',
    username: '',
    password: '',
};

const initialFormErrors = {
    username: '',
    password: '',
};

const initialDisabled = true;

const Login = () => {
  
    const [ formValues, setFormValues ] = useState(initialFormValues);
    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ disabled, setDisabled ] = useState(initialDisabled);

    const { push } = useHistory();

    const onSubmit = e => {
        e.preventDefault();
        axios.post('https://tt130bwplants.herokuapp.com/api/auth/login', formValues)
            .then(res => {
                console.log(res);
                localStorage.setItem('authToken', res.data.payload);
            })
            .catch(err => console.log(err));
        push('/plants');
    };

    const onChange = (e) => {
       yup
        .reach(loginSchema, e.target.name)
        .validate(e.target.value)
          .then(() => setFormErrors({
            ...formErrors, 
            [e.target.name]: ''
          }))
          .catch(({errors}) => setFormErrors({
            ...errors, 
            [e.target.name]: formErrors[0]
          }));
      
       setFormValues({
          ...formValues,
          [e.target.name]: e.target.value,
        });
      };
  
      useEffect(() => {
        loginSchema
          .isValid(formValues)
          .then(valid => setDisabled(!valid))
        }, [formValues])

    return(
      <Styled>
        <UserContext.Provider value={{
          formValues,
          setFormValues,
        }}>
          <div>
            <h1>Water my Plants</h1>

            <div>
              <h3>Log into your Account</h3>

            <form onSubmit={onSubmit} className='form'>
              <div>{formErrors.username}</div>
              <div>{formErrors.password}</div>

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
                  type='text'
                  name='password'
                  value={formValues.password}
                />
              </label>
              
              <button className='btn' disabled={disabled}>Login</button>
              
              <Link to='/register'>Don't Have An Account?</Link>

            </form>
          </div>
        </div>
      </UserContext.Provider>
    </Styled>
  )
};

export default Login;

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
