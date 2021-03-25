import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../helpers/axiosWithAuth';

const EditUser = () => {

    const initialState = {
        username: '',
        password: '',
        phone: '',
    }

    const [editUser, setEditUser] = useState(initialState);

    const { push } = useHistory();
    const saveEdit = e => {
        e.preventDefault();
        axiosWithAuth().put(`/user/${editUser.id}`, editUser)
          .then(res => console.log(res))
            // updatePlants(plants.map(item => {
            //   if(item.id === res.data.id) {
            //     return res.data
            //   } else {
            //     return item
            //   }
            // }))
          .catch(err => console.log(err));
        push('/plants')
    };

    const deleteUser = user => {
        axiosWithAuth().delete(`user/${user.id}`)
            .then(res => console.log(res))
            // updatePlants(plants.filter(item => {
            //   return item.id !== plant.id
            // }))
            .catch(err => console.log(err));
        push('/login')
    };

    const handleChange = (e) => {
        setEditUser({ 
            ...editUser, 
            [e.target.name]: e.target.value 
        })
    };

    return(
        <>
        <h1>Edit My Account</h1>
        
        <form onSubmit={saveEdit}>

            <label htmlFor="username">Username:</label>
            <input
                name="username"
                onChange={handleChange}
                value={editUser.username}
            />

            <label htmlFor="password">Password:</label>
            <input
                name="password"
                onChange={handleChange}
                value={editUser.password}
            />
    
            <label htmlFor="phone">Phone Number:</label>
            <input
                name="phone"
                onChange={handleChange}
                value={editUser.phone}
            />
    
            <button>Save</button>
            <button onClick={deleteUser}>Delete Account</button>
        </form>
        </>
    )
};

export default EditUser;