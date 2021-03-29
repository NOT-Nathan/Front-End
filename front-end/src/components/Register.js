import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = ({user, setUser}) => {
    const {push} = useHistory();
    
    const register = e => {
        e.preventDefault();
        axios.post('https://tt130bwplants.herokuapp.com/api/auth/register', user)
            .then(res => {
                console.log(res);
                setUser(res.data);
                // localStorage.setItem('authToken', res.data.payload);
            })
            .catch(err => console.log(err));
            push('/login')
    };

    const handleChange = e => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        })
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
                value={user.username}
                onChange={handleChange}
            />
  
            <label>Password:</label>
            <input
                type='text'
                name='password'
                value={user.password}
                onChange={handleChange}
            />

            <label>Phone Number:</label>
            <input
                type='text'
                name='phone'
                value={user.phone}
                onChange={handleChange}
            />
  
            <button>Register</button>
  
        </form>
      </>
    )
};

export default Register;