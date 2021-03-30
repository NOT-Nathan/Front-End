import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// check before you change your code. I may be wrong.
const Register = ({user, setUser}) => {
    const {push} = useHistory();
    
    const register = e => {
        // this doesn't need to be an event(e). pass setUser as parameter then run post request with setUser, not user. 
        e.preventDefault();
        axios.post('https://tt130bwplants.herokuapp.com/api/auth/register', user)
            .then(res => {
                console.log(res);
            // should localStorage be referenced here? localStorage.setItem("token", res.data.token);
            // setUser(res.data.setUser);
                setUser(res.data.new_user);
                // localStorage.setItem('authToken', res.data.payload);
            })
            .catch(err => console.log(err));
            push('/plants')
    };

    const handleChange = e => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        })
      };

    return(
        <>
        {/* {console.log(user)} */}
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
                name='phonenumber'
                value={user.phonenumber}
                onChange={handleChange}
            />
  
            <button>Register</button>
  
        </form>
      </>
    )
};

export default Register;
