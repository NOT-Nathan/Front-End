import React, { useState } from 'react';
import axiosWithAuth from '../helpers/axiosWithAuth';

const EditPlant = () => {

    const initialState = {
        id: Date.now(),
        nickname: '',
        species: '',
        H2O: '',
        img: '',
        userID: '',
    }

    const [plantToEdit, setPlantToEdit] = useState(initialState);

    const saveEdit = e => {
        e.preventDefault();
        axiosWithAuth().put(`/plants/${plantToEdit.id}`, plantToEdit)
          .then(res => console.log(res))
            // updatePlants(plants.map(item => {
            //   if(item.id === res.data.id) {
            //     return res.data
            //   } else {
            //     return item
            //   }
            // }))
          .catch(err => console.log(err))
    };

    const deletePlant = plant => {
        axiosWithAuth().delete(`plants/${plant.id}`)
            .then(res => console.log(res))
            // updatePlants(plants.filter(item => {
            //   return item.id !== plant.id
            // }))
            .catch(err => console.log(err))
    };

    const handleChange = (e) => {
        setPlantToEdit({ 
            ...plantToEdit, 
            [e.target.name]: e.target.value 
        })
    };

    return(
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
      
          <button>Save</button>
          <button onClick={deletePlant}>Delete</button>
      
        </form>
    )
};

export default EditPlant;