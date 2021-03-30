import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import axios from "axios";
import { loginSchema } from '../validation/loginSchema';
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
        <div>
            <h1>Water My Plants!</h1>

            <form onSubmit={onSubmit}>
              <div>{formErrors.userName}</div>
              <div>{formErrors.passWord}</div>

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

               <button disabled={disabled}> Login</button>

               <Link to='/register'>Don't Have An Account?</Link>
            </form>
        </div>
    )
};

export default Login;

