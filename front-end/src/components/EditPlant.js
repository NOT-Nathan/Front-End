import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../helpers/axiosWithAuth';
import * as yup from 'yup';
import editPlantSchema from '../validation/editPlantSchema'

const EditPlant = ({plantList, setPlantList}) => {

    const initialState = {
        nickname: '',
        species: '',
        H2O: '',
        img: '',
        userID: '',
    }

    const initialFormErrors = {
        nickname: '',
        species: '',
        H2O: '',
        img: ''
    }

    const initialDisabled = true

    const [plantToEdit, setPlantToEdit] = useState(initialState);
    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ disabled, setDisabled ] = useState(initialDisabled);

    const { push } = useHistory();

    const saveEdit = e => {
        e.preventDefault();
        axiosWithAuth().put(`https://tt130bwplants.herokuapp.com/api/auth/plants/${plantToEdit.id}`, plantToEdit)
            .then(res => {
                console.log(res);
                setPlantList(plantList.map(item => {
                    if(item.id === res.data.id) {
                        return res.data
                    } else {
                        return item
                    }
                }))
            })
            .catch(err => console.log(err));
        push('/plants');
    };

    const deletePlant = plant => {
        axiosWithAuth().delete(`https://tt130bwplants.herokuapp.com/api/auth/plants/${plant.id}`)
            .then(res => {
                console.log(res);
                setPlantList(plantList.filter(item => {
                    return item.id !== plant.id
                }))
            })
            .catch(err => console.log(err))
    };

    const handleChange = (e) => {
        yup
        .reach(editPlantSchema, e.target.name)
        .validate(e.target.value)
          .then(() => setFormErrors({
            ...formErrors, 
            [e.target.name]: ''
          }))
          .catch(({errors}) => setFormErrors({
            ...errors, 
            [e.target.name]: formErrors[0]
          }));

        setPlantToEdit({ 
            ...plantToEdit, 
            [e.target.name]: e.target.value 
        })
    };

    useEffect(() => {
        editPlantSchema
          .isValid(plantToEdit)
          .then(valid => setDisabled(!valid))
        }, [plantToEdit])

    return(
        <>
        <h1>Edit Plant</h1>

        <form onSubmit={saveEdit}>

            <label htmlFor="nickname">Plant Nickname:</label>
                <input
                    name="nickname"
                    onChange={handleChange}
                    value={plantToEdit.nickname}
                />

            <label htmlFor="species">Plant Species:</label>
                <input
                    name="species"
                    onChange={handleChange}
                    value={plantToEdit.species}
                />

            <label htmlFor="H2O">Water Frequency:</label>
                <input
                    name="H2O"
                    onChange={handleChange}
                    value={plantToEdit.H2O}
                />

            <label htmlFor="img">Image:</label>
                <input
                    name="img"
                    onChange={handleChange}
                    value={plantToEdit.img}
                />
      
          <button disabled={disabled}>Save</button>
          <button onClick={() => deletePlant}>Delete</button>
      
        </form>
        </>
    )
};

export default EditPlant;