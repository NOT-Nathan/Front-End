import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { loginSchema } from '../validation/loginSchema';
import axios from 'axios';

const initialFormValues = {
    username: '',
    password: '',
  }

  const initialFormErrors = {
    userName: '',
    passWord: '',
  }

  const initialDisabled = true

function Login() {

    const [ formValues, setFormValues ] = useState(initialFormValues);
    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ post, setPost ] = useState();
    const [ disabled, setDisabled ] = useState(initialDisabled);

    const inputChange = (name, value, e) => {
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
        <div>
            <form onSubmit={onSubmit}>
            <div>{formErrors.name}</div>
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
                <button disabled={disabled}>Login</button>
            </form>
        </div>
    )
}

export default Login