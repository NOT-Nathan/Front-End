import React from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../helpers/axiosWithAuth';

const EditUser = ({user, setUser}) => {

    const { push } = useHistory();

    const saveEdit = e => {
        e.preventDefault();
        axiosWithAuth().put(`https://tt130bwplants.herokuapp.com/api/user/${user.id}`, user)
            .then(res => {
                console.log(res)
                setUser(res.data)
            })
            .catch(err => console.log(err));
        push('/plants')
    };

    const deleteUser = username => {
        axiosWithAuth().delete(`https://tt130bwplants.herokuapp.com/api/user/${username.id}`)
            .then(res => {
                setUser(user);
                console.log(user)
            })
            .catch(err => console.log(err));
        push('/')
    };

    const handleChange = (e) => {
        setUser({ 
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
                value={user.phonenumber}
            />
    
            <button>Save</button>
            <button onClick={deleteUser}>Delete Account</button>
        </form>
        </>
    )
};

export default EditUser;