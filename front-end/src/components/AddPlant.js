import axiosWithAuth from '../helpers/axiosWithAuth';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const AddPlant = ({plantList, setPlantList}) => {

    const initialState = {
        id: Date.now(),
        nickname: '',
        species: '',
        H2O: '',
        img: '',
    }

    const [newPlant, setNewPlant] = useState(initialState);

    const handleChange = (e) => {
        setNewPlant({ 
            ...newPlant, 
            [e.target.name]: e.target.value 
        })
    };

    console.log(plantList)
    const submit = useEffect(() => {
        axiosWithAuth().post(`https://tt130bwplants.herokuapp.com/api/plants`, newPlant)
        //axiosWithAuth().post(`https://tt130bwplants.herokuapp.com/api/users/${}/plants`, newPlant)
        //how do I access the userId in this post?
            .then(res => {
                console.log(res);
                setPlantList({
                    ...plantList,
                    newPlant
                })
            })
            .catch(err => console.log(err));
        }, [plantList, newPlant, setPlantList] );

    const { push } = useHistory();

    return(
        <Styled>
  
        <form onSubmit={submit}>
        
            <div className='heading'>

                <h2>Add A New Plant</h2>

            </div>

            <div className='main-container'>

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

            </div>

        </form>

        </Styled>
    )
};

export default AddPlant;

const Styled = styled.div`
h2{
  color: blue;
  text-shadow: 2.2px 1px 0px white;
  font-family: WildGrowth;
  font-size: 50px;
}

label{
  font-size: 1.4rem;
  margin: 1% 0%;
  text-decoration: underline;
  font-family: Arial, Helvetica, sans-serif;
}

input{
  border-radius: 15px;
}

button{
  padding: 0.5% 1%;
  font-size: 18px;
  border-radius: 15px;
  background-color: rosybrown;
  color: blue;
}

& .heading{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

& .main-container{ 
    display: flex;
    justify-content: space-around;
    width: 80%;
    align-items: center;
    margin: 0 auto;
}
`