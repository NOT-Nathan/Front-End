import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import axiosWithAuth from '../helpers/axiosWithAuth';
import AddPlant from './AddPlant';
import EditPlant from "./EditPlant";
import styled from 'styled-components';

const PlantList = () => {

    const [plantList, setPlantList] = useState([]);
    const { push } = useHistory();

    useEffect(() => {
        axiosWithAuth().get(`https://tt130bwplants.herokuapp.com/api/auth/plants`)
            .then(res => {
                console.log(res);
                setPlantList(res.data)
            })
            .catch(err => console.log(err))
    }, [] );

    const logout = e => {
        localStorage.clear();
        push('/')
    }

    return(
        <Styled>
            <div className="plant-list-container">

                <div className='add-plant'>

                <button onClick={() => {
                <AddPlant plantList={plantList} setPlantList={setPlantList}/>;
                push('/addPlant')
                }}>
                Add Plant
                </button>

                </div>

            <h1>Plants</h1>
            <div className="secondary-list-container">

                <Link to='/editAccount'>

                    <button className='logout-btn'>
                        Edit My Account
                    </button>

                </Link>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

            </div>

            {/* {console.log(plantList)} */}
            {plantList.map(plant => (
                <div key={plant.id} className='plant-card'>
                    <img src={plant.img} alt='plant' onClick={<EditPlant />} />
                    <p>Nickname:{plant.nickname}</p>
                    <p>Species:{plant.species}</p>
                    <p>H2O:{plant.H2O}</p>
                </div>
            ))}

        </Styled>
    )
};

export default PlantList;

const Styled = styled.div`

h1{
  color: blue;
  text-shadow: 2.2px 1px 0px white;
  font-family: WildGrowth;
  font-size: 50px;
  text-align: end;
}

button{
  padding: 2% 5%;
  font-size: 20px;
  background-color: rosybrown;
  color: blue;
}

& .plant-list-container{
    display: flex;
    justify-content: space-evenly;
}

& .add-plant{
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2%;
}

& .secondary-list-container{
    width: 20%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

& .logout-btn{
    color: blue;
}

button:hover{
    background-color: lightgray;
}

`