import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';

function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path='/plantlist'>

        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/'>
          <Login />
        </Route>
      </Router>
    </div>
  );
}

export default App;
