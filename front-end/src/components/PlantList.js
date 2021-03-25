import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import axiosWithAuth from '../helpers/axiosWithAuth';

const PlantList = () => {

    const [plantList, setPlantList] = useState([]);

    useEffect(() => {
        axiosWithAuth().get('/plants')
            .then(res => console.log(res))
            //setPlantList(res.data)
            .catch(err => console.log(err))
    }, [] );

    const { push } = useHistory();

    return(
        <div className="plant-list-container">

            <h1>Plants</h1>

            <Link to='/editAccount' >
                Edit My Account
            </Link>
            <Link to='/login'>
                Logout
            </Link>

            <ul>
                {plantList.map(plant => (
                    <li key={plant.id} onClick={push('/editPlant')}>
                        <img src={plant.img} alt='plant' />
                    </li>
                ))}
            </ul>  
      </div>
    )
};

export default PlantList;