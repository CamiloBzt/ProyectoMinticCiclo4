import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {TaskControl} from './components/pages/TaskControl';
import {Products} from './components/pages/Products';
import {Login} from './components/pages/Login';
import Registrarse from './components/pages/Products';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/TaskControl' component={TaskControl} />
          <Route path='/products' component={Registrarse} />
          <Route path='/Login' component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
