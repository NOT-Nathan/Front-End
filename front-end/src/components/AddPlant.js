import axiosWithAuth from '../helpers/axiosWithAuth';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import addPlantSchema from '../validation/addPlantSchema';
import { UserContext } from '../contexts/UserContext';

const AddPlant = ({plantList, setPlantList}) => {

    const { formValues } = useContext(UserContext);

    const initialState = {
        id: Date.now(),
        nickname: '',
        species: '',
        H2O: '',
        img: '',
    }

    const initialFormErrors = {
        nickname: '',
        species: '',
        H2O: '',
        img: ''
    }

    const initialDisabled = true

    const [newPlant, setNewPlant] = useState(initialState);
    const [ formErrors, setFormErrors ] = useState(initialFormErrors);
    const [ disabled, setDisabled ] = useState(initialDisabled);

    const handleChange = (e) => {
        yup
        .reach(addPlantSchema, e.target.name)
        .validate(e.target.value)
          .then(() => setFormErrors({
            ...formErrors, 
            [e.target.name]: ''
          }))
          .catch(({errors}) => setFormErrors({
            ...errors, 
            [e.target.name]: formErrors[0]
          }));

        setNewPlant({ 
            ...newPlant, 
            [e.target.name]: e.target.value 
        })
    };

    // console.log(plantList)
    const submit = useEffect(() => {
        axiosWithAuth().post(`https://tt130bwplants.herokuapp.com/api/users/${formValues.id}/plants`, newPlant)
            .then(res => {
                console.log(res);
                setPlantList({
                    ...plantList,
                    newPlant
                })
            })
            .catch(err => console.log(err));
        }, [plantList, newPlant, setPlantList, formValues.id] );

    const { push } = useHistory();

    useEffect(() => {
        addPlantSchema
          .isValid(newPlant)
          .then(valid => setDisabled(!valid))
        }, [newPlant])

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
                placeholder='Optional'
                name="img"
                onChange={handleChange}
                value={newPlant.img}
            />

            <button disabled={disabled} onClick={() => push('/plants')}>Add Plant</button>

            </div>

        </form>

        </Styled>
    )
};

export default AddPlant;

const Styled = styled.div`

font-family: Comfortaa;

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
  font-family: Comfortaa;
}

input{
  border-radius: 15px;
  padding: 0.4% 0%;
  font-family: Comfortaa;
}

button{
  padding: 0.5% 1%;
  font-size: 18px;
  border-radius: 15px;
  background-color: rosybrown;
  color: blue;
  font-family: Comfortaa;
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

button:hover{
    background-color: lightgray;
}
`