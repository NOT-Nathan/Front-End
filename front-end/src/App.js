import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import EditPlant from './components/EditPlant';
import PlantList from './components/PlantList';
import EditUser from './components/EditUser';
import AddPlant from './components/AddPlant';
import { UserContext } from './contexts/UserContext';

function App() {

  const initialFormValues = {
    id: '',
    username: '',
    password: '',
  };

  const [ formValues, setFormValues ] = useState(initialFormValues);

  return (
    <div className="App">
      <UserContext.Provider value={{formValues, setFormValues}}>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>

          <Route path='/register'>
            <Register />
          </Route>

          <PrivateRoute path='/plants'>
            <PlantList />
          </PrivateRoute>

          <PrivateRoute path='/editPlant'>
            <EditPlant />
          </PrivateRoute>

          <PrivateRoute path='/editAccount'>
            <EditUser />
          </PrivateRoute>

          <PrivateRoute path='/addPlant'>
            <AddPlant />
          </PrivateRoute>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
