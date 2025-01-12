import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../helpers/axiosWithAuth';
import { UserContext } from '../contexts/UserContext';

const EditUser = () => {

    const { formValues, setFormValues } = useContext(UserContext);

    const { push } = useHistory();

    const saveEdit = e => {
        e.preventDefault();
        axiosWithAuth().put(`https://tt130bwplants.herokuapp.com/api/user/${formValues.id}`, formValues)
            .then(res => {
                console.log(res)
                setFormValues(res.data)
            })
            .catch(err => console.log(err));
        push('/plants')
    };

    const deleteUser = e => {
        axiosWithAuth().delete(`https://tt130bwplants.herokuapp.com/api/user/${formValues.id}`)
            .then(res => {
                console.log(res);
                setFormValues(formValues);
            })
            .catch(err => console.log(err));
        push('/')
    };

    const handleChange = (e) => {
        setFormValues({ 
            ...formValues, 
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
                value={formValues.password}
            />
    
            <label htmlFor="phone">Phone Number:</label>
            <input
                name="phone"
                onChange={handleChange}
                value={formValues.phonenumber}
            />
    
            <button>Save</button>
            <button onClick={() => deleteUser}>Delete Account</button>
        </form>
        </>
    )
};

export default EditUser;