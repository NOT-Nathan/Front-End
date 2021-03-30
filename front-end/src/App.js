import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import EditPlant from './components/EditPlant';
import PlantList from './components/PlantList';
import EditUser from './components/EditUser';
import AddPlant from './components/AddPlant';

function App() {
  const initialState = {
    username: '',
    password: '',
    phonenumber: '',
  };

  const [user, setUser] = useState(initialState);

  return (
    <Router>

        <Switch>
          <Route exact path='/'>
            <Login user={user} setUser={setUser}/>
          </Route>

          <Route path='/register'>
            <Register user={user} setUser={setUser}/>
          </Route>

          <PrivateRoute path='/plants'>
            <PlantList />
          </PrivateRoute>

          <PrivateRoute path='/editPlant'>
            <EditPlant />
          </PrivateRoute>

          <PrivateRoute path='/editAccount'>
            <EditUser user={user} setUser={setUser}/>
          </PrivateRoute>

          <PrivateRoute path='/addPlant'>
            <AddPlant />
          </PrivateRoute>
        </Switch>
    
    </Router>
  );
}

export default App;
