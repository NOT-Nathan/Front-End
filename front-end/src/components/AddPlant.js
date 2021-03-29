import axiosWithAuth from '../helpers/axiosWithAuth';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddPlant = ({plantList, setPlantList}) => {

    const initialState = {
        id: Date.now(),
        nickname: '',
        species: '',
        H2O: '',
        img: '',
        userID: '',
    }

    const [newPlant, setNewPlant] = useState(initialState);

    const handleChange = (e) => {
        setNewPlant({ 
            ...plantList, 
            [e.target.name]: e.target.value 
        })
    };

    const submit = () => {
        axiosWithAuth().put(`https://tt130bwplants.herokuapp.com/api/user/${plantList.userID}/plants `, newPlant)
            .then(res => {
                console.log(res);
                // setPlantList({
                //     ...plantList,
                //     newPlant
                // })
            })
            .catch(err => console.log(err));
    };

    const { push } = useHistory();

    return(
        <form onSubmit={submit}>
            <h1>Add A New Plant</h1>

            <label htmlFor="nickname">Plant Nickname:</label>
            <input
                name="nickname"
                onChange={handleChange}
                value={newPlant.nickname}
            />

            <label htmlFor="species">Plant Species:</label>
            <input
                name="species"
                onChange={handleChange}
                value={newPlant.species}
            />

            <label htmlFor="H2O">Water Frequency:</label>
            <input
                name="H2O"
                onChange={handleChange}
                value={newPlant.H2O}
            />

            <label htmlFor="img">Image:</label>
            <input
                name="img"
                onChange={handleChange}
                value={newPlant.img}
            />

            <button onClick={() => push('/plants')}>Add Plant</button>
        </form>
    )
};

export default AddPlant;