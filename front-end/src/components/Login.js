import React from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Login = ({user, setUser}) => {

    const { push } = useHistory();

    const login = e => {
        e.preventDefault();
        axios.post('https://tt130bwplants.herokuapp.com/api/auth/login', user)
            .then(res => {
                console.log(res);
                localStorage.setItem('authToken', res.data.payload);
            })
            .catch(err => console.log(err));
        push('/plants');
    };

    const handleChange = e => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        })
      };

    return(
        <>
        {console.log(user)}
            <h1>Water My Plants!</h1>

            <form onSubmit={login}>

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

                <button> Login</button>

                <Link to='/register'>Don't Have An Account?</Link>
                
            </form>
        </>
    )
};

export default Login;