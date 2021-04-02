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
    userName: '',
    phonenumber: '',
    password: '',
}

const initialDisabled = true

const Register = () => {
  
    const [ formValues, setFormValues ] = useState(initialFormValues);
    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ disabled, setDisabled ] = useState(initialDisabled);
  
    const {push} = useHistory();
    
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
        <div className='main'>
          <h1>Water my Plants</h1>
            <form onSubmit={onSubmit} className='form'>
            <h3>Fill out this form to create your account.</h3>
            <div>{formErrors.username}</div>
            <div>{formErrors.password}</div>
            <div>{formErrors.phonenumber}</div>
                <label>Username:
                    <input 
                        onChange={onChange}
                        type='text'
                        name='username'
                        value={formValues.username}
                        placeholder='Username'
                    />
                </label>
                <label>Password:
                    <input 
                    onChange={onChange}
                    type='text'
                    name='password'
                    value={formValues.password}
                    placeholder='Password'
                    />
                </label>
                <label className='last'>Phone Number:
                    <input 
                    onChange={onChange}
                    type='text'
                    name='phonenumber'
                    value={formValues.phonenumber}
                    placeholder='Phone Number'
                    />
                </label>
                <Link to='/' className='btn-link'>
                  <button disabled={disabled} className='btn'>Register</button>
                </Link>
            </form>
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
  border: solid 4px forestgreen;
  background-color: #E9967A;
  width: 90%;
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

& .last{
  margin-bottom: 3%;
}

& .btn-link{
  width: 70%;
  margin: 0 auto;
  margin-bottom: 4%;
}

button{
  margin-bottom: 10%;
  margin-top: 2%;
  padding: 1% 0%;
  background-color: rosybrown;
  color: blue;
}

input{
  border-radius: 15px;
  padding-top: 2%;
  padding-bottom: 2%;
  width: 100%;
  margin-bottom: 8px;
}

label{
  font-size: 1.2rem;
  margin: 1% 0%;
  font-family: Arial, Helvetica, sans-serif;
}

h1{
  color: blue;
  text-shadow: 2.2px 1px 0px white;
  font-family: WildGrowth;
  font-size: 50px;
}

h3{
  color: black;
  font-family: Arial, Helvetica, sans-serif ;
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
