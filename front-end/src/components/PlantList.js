import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import axiosWithAuth from '../helpers/axiosWithAuth';
import AddPlant from './AddPlant';
import EditPlant from "./EditPlant";
import { UserContext } from '../contexts/UserContext';

const PlantList = () => {

    const { formValues } = useContext(UserContext);

    const [plantList, setPlantList] = useState([]);
    const { push } = useHistory();

    useEffect(() => {
        axiosWithAuth().get(`https://tt130bwplants.herokuapp.com/api/users/${formValues.id}/plants`)
            .then(res => {
                console.log(res);
                setPlantList(res.data)
            })
            .catch(err => console.log(err))
    }, [formValues.id] );

    const logout = e => {
        localStorage.clear();
        push('/')
    }

    return(
        <div className="plant-list-container">

            <h1>Plants</h1>

            <Link to='/editAccount' >
                Edit My Account
            </Link>
            <button onClick={logout}>
                Logout
            </button>

            {/* {console.log(plantList)} */}
            {plantList.map(plant => (
                <div key={plant.id}>
                    <img src={plant.img} alt='plant' onClick={<EditPlant />} />
                    <p>Nickname:{plant.nickname}</p>
                    <p>Species:{plant.species}</p>
                    <p>H2O:{plant.H2O}</p>
                </div>
            ))}

            <button onClick={() => {
                <AddPlant plantList={plantList} setPlantList={setPlantList}/>;
                push('/addPlant')
            }}>
            Add Plant
            </button>
        </div> 
    )
};

export default PlantList;