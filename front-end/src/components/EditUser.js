import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../helpers/axiosWithAuth';

const EditUser = () => {

    const initialState = {
        username: '',
        password: '',
        phone: '',
    }

    const [user, updateUser] = useState(initialState);

    const { push } = useHistory();
    const saveEdit = e => {
        e.preventDefault();
        axiosWithAuth().put(`https://tt130bwplants.herokuapp.com/api/user/${user.id}`, user)
            .then(res => {
                console.log(res)
                updateUser(res.data)
            })
            .catch(err => console.log(err));
        push('/plants')
    };

    const deleteUser = username => {
        axiosWithAuth().delete(`https://tt130bwplants.herokuapp.com/api/user/${username.id}`)
            .then(res => {
                updateUser(user);
                console.log(user)
            })
            .catch(err => console.log(err));
        push('/login')
    };

    const handleChange = (e) => {
        updateUser({ 
            ...user, 
            [e.target.name]: e.target.value 
        })
    };

    return(
        <>
        <h1>Edit My Account</h1>
        
        <form onSubmit={saveEdit}>

            <label htmlFor="password">Password:</label>
            <input
                name="password"
                onChange={handleChange}
                value={user.password}
            />
    
            <label htmlFor="phone">Phone Number:</label>
            <input
                name="phone"
                onChange={handleChange}
                value={user.phone}
            />
    
            <button>Save</button>
            <button onClick={deleteUser}>Delete Account</button>
        </form>
        </>
    )
};

export default EditUser;