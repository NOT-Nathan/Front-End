import React, { useEffect, useState, useContext } from 'react';
import * as yup from 'yup';
import { loginSchema } from '../validation/loginSchema';
import styled from 'styled-components';
import { useHistory, Link } from "react-router-dom";
import '../index.css';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';


const initialFormErrors = {
    username: '',
    password: '',
};

const initialFormErrors = {
    username: '',
    passnord: '',
};

const initialDisabled = true;

const Login = () => {

    const { formValues, setFormValues } = useContext(UserContext);
  
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
        <div className='main'>
          <h1>Water my Plants</h1>
            <form onSubmit={onSubmit} className='form'>
            <h3>Log into your Account</h3>
              <div>{formErrors.username}</div>
              <div>{formErrors.password}</div>
                <label>Username:
                    <input 
                    onChange={onChange}
                    type='text'
                    name='username'
                    value={formValues.username}
                    placeholder='Username'
                    />
                </label>
                <label className='last'>Password:
                    <input 
                        onChange={onChange}
                        type='text'
                        name='password'
                        value={formValues.password}
                        placeholder='Password'
                    />
                </label>
                <Link to='/plants' className='btn-link'>
                  <button className='btn' disabled={disabled}>Login</button>
                </Link>
              <Link to='/register' className='link'>Don't Have An Account?</Link>
            </form>
        </div>
    </Styled>
  )
};

export default Login;

const Styled = styled.div`

font-family: Comfortaa;

& .form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 4px forestgreen;
  background-color: #E9967A;
  width: 80%;
}

& .btn{
  width: 100%;
  margin: 0 auto;
}

& .main{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

& .link{
  color: blue;
  margin-top: 4%;
  margin-bottom: 4%;
  font-family: Comfortaa;
}

& .btn-link{
  width: 70%;
  margin: 0 auto;
}

& .last{
  margin-bottom: 3%;
}

button{
  margin-bottom: 10px;
  margin-top: 2%;
  padding: 1% 0%;
  background-color: rosybrown;
  color: blue;
  font-family: Comfortaa;
}

input{
  border-radius: 15px;
  padding-top: 2%;
  padding-bottom: 2%;
  width: 100%;
  margin-bottom: 8px;
  font-family: Comfortaa;
}

label{
  font-size: 1.2rem;
  margin: 1% 0%;
  font-family: Comfortaa;
}

h1{
  color: blue;
  text-shadow: 2.2px 1px 0px white;
  font-family: WildGrowth;
  font-size: 50px;
}

h3{
  color: black;
  font-family: Comfortaa;
}

button:hover{
    background-color: lightgray;
}

@media(min-width: 1200px) {
  & .btn{
    width: 100%;
  }

  & .btn-link{
    width: 40%;
  }
}

`
