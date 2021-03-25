import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

const Register = () => {
    const initialState = {
        username: '',
        password: '',
        phone: '',
    }
  
    const [credentials, setCredentials] = useState(initialState);
  
    const handleChange = e => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
      })
    };
  
    const { push } = useHistory();
    const register = e => {
        e.preventDefault();
        axios.post('/register', credentials)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        push('/login')
    };
    return(
        <>
        <h1>
          Register a New Account
        </h1>
  
        <form onSubmit={register}>
  
            <label>Username:</label>
            <input
                type='text'
                name='username'
                value={credentials.username}
                onChange={handleChange}
            />
  
            <label>Password:</label>
            <input
                type='text'
                name='password'
                value={credentials.password}
                onChange={handleChange}
            />

            <label>Phone Number:</label>
            <input
                type='text'
                name='phone'
                value={credentials.phone}
                onChange={handleChange}
            />
  
            <button>Register</button>
  
        </form>
      </>
    )
};

export default Register;