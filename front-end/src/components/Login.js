import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { loginSchema } from '../validation/loginSchema';
import axios from 'axios';
import styled from 'styled-components';

const initialFormValues = {
    username: '',
    password: '',
  }

  const initialFormErrors = {
    username: '',
    password: '',
  }

  const initialDisabled = true

function Login() {

    const [ formValues, setFormValues ] = useState(initialFormValues);
    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ post, setPost ] = useState();
    const [ disabled, setDisabled ] = useState(initialDisabled);

    const inputChange = (name, value) => {
        yup.reach(loginSchema, name)
        .validate(value)
        .then(() => setFormErrors({...formErrors, [name]: ''}))
        .catch(({errors}) => setFormErrors({...errors, [name]: formErrors[0]}))
        setFormValues({
          ...formValues,
          [name]: value
        })
      }

      const onChange = e => {
        const {name, value} = e.target
        inputChange(name, value)
    }

    const onSubmit = e => {
        e.preventDefault();
        axios
        .post("https://reqres.in/api/users", formValues)
        .then((res) => {
          setPost(res.data)
          console.log(res.data)
          setFormValues(initialFormValues)
        })
        .catch((err) => {
          console.log(err)
        })

      }

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
                        type='password'
                        name='password'
                        value={formValues.password}
                    />
                </label>
              <Link className='btn'>
                <button disabled={disabled}>Login</button>
              </Link>
            </form>
          </div>
        </div>
      </Styled>
    )
}

export default Login

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