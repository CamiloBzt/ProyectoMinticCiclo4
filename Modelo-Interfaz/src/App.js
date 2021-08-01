import React, { useEffect, useReducer } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {TaskControl} from './components/pages/TaskControl';
import {Products} from './components/pages/Products';
import {Login} from './components/pages/Login';
import Registrarse from './components/pages/Products';
import { UserContext } from './contexts/UserContext';
import userReducer from './reducers/userReducer';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';


const userInit = () => JSON.parse( localStorage.getItem( 'user' ) ) || { auth: false };

function App() {

  const [ user, dispatchUser ] = useReducer( userReducer, {}, userInit );

  useEffect(() => {
    localStorage.setItem( 'user', JSON.stringify( user ));
  }, [ user ]);

  return (
    <>
      <Router>

      <UserContext.Provider value={{ user, dispatchUser }}>

        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />

           {/* <PrivateRoutes path='/TaskControl' component={TaskControl} isAuthenticated={user?.auth} />  */}

          <PublicRoutes path='/products' component={Registrarse} isAuthenticated={user?.auth} />

          <PublicRoutes path='/Login' component={Login} isAuthenticated={user?.auth} /> 

             <Route path='/TaskControl' component={TaskControl} />
            {/* <Route path='/products' component={Registrarse} />
            <Route path='/Login' component={Login} /> 
 */}
         

        </Switch>

        </UserContext.Provider>

      </Router>
    </>
  );
}

export default App;
