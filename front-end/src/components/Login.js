import React, { useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import axios from "axios";

const Login = () => {
    const initialState = {
       username: '',
       password: '',
       phone: '',
    };

    const [credentials, setCredentials] = useState(initialState);

    const handleChange = e => {
        setCredentials({
          ...credentials,
          [e.target.name]: e.target.value,
        })
      };
    
    const { push } = useHistory();
    const login = e => {
        e.preventDefault();
        axios.post('https://tt130bwplants.herokuapp.com/api/auth/login', credentials)
            .then(res => {
                // console.log(res);
                localStorage.setItem('authToken', res.data.payload);
            })
            .catch(err => console.log(err));
        push('/plants');
    };

    return(
        <>
            <h1>Water My Plants!</h1>

            <form onSubmit={login}>

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

                <button> Login</button>

                <Link to='/register'>Don't Have An Account?</Link>
            </form>
        </>
    )
};

export default Login;