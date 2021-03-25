import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { registerSchema } from '../validation/registerSchema';
import axios from 'axios';

const initialFormValues = {
    username: '',
    phoneNumber: '',
    password: '',
  }

  const initialFormErrors = {
    userName: '',
    phoneNumber: '',
    passWord: '',
  }

  const initialDisabled = true

function Register() {

    const [ formValues, setFormValues ] = useState(initialFormValues);
    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ post, setPost ] = useState();
    const [ disabled, setDisabled ] = useState(initialDisabled);

    const inputChange = (name, value, e) => {
        yup.reach(registerSchema, name)
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
        registerSchema.isValid(formValues)
        .then(valid => setDisabled(!valid))
        }, [formValues])

    return(
        <div className='main-container'>
            <form onSubmit={onSubmit}>
            <div>{formErrors.name}</div>
            <div>{formErrors.password}</div>
            <div>{formErrors.phoneNumber}</div>
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
                    name='phoneNumber'
                    value={formValues.phoneNumber}
                    />
                </label>
                <Link to='/'>
                <button disabled={disabled}>Register</button>
                </Link>
            </form>
        </div>
    )
}

export default Register