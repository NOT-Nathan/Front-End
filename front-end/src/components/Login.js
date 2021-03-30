import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from "axios";
import { loginSchema } from '../validation/loginSchema';
import styled from 'styled-components';
import { useHistory, Link } from "react-router-dom";

const initialFormValues = {
    username: '',
    password: '',
};

const initialFormErrors = {
    userName: '',
    passWord: '',
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
                setFormValues(initialFormValues);
            })
            .catch(err => console.log(err));
        push('/plants');
    };

    const onChange = (name, value, e) => {
       yup.reach(loginSchema, name)
        .validate(value)
          .then(() => setFormErrors({...formErrors, [name]: ''}))
          .catch(({errors}) => setFormErrors({...errors, [name]: formErrors[0]}));
      
       setFormValues({
          ...formValues,
          [e.target.name]: e.target.value,
        });
      };
  
      useEffect(() => {
        loginSchema.isValid(formValues)
        .then(valid => setDisabled(!valid))
        }, [formValues])

    return(
      <Styled>
        <div>
          <h1>Water my Plants</h1>
          <div>
          <h3>Log into your Account</h3>
            <form onSubmit={onSubmit} className='form'>
              <div>{formErrors.userName}</div>
              <div>{formErrors.passWord}</div>
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
              <Link className='btn'>
                <button disabled={disabled}>Login</button>
              </Link>
      
              <Link to='/register'>Don't Have An Account?</Link>

            </form>
          </div>
        </div>
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
